from flask_socketio import emit
import sqlite3
from flask_jwt_extended import decode_token, jwt_required, get_jwt_identity
from datetime import datetime
import pytz
from models.data_base import DATABASE

def register_sockets(socketio):

    @socketio.on("connect")
    def handle_connect(auth):
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()
        c.execute(
            """
            SELECT  p.id, p.texto, u.nombre, u.carrera, p.fecha
            FROM Preguntas p
            LEFT JOIN Usuarios u ON p.usuario_id = u.id
            ORDER BY p.ID DESC
            LIMIT 10
            """
        )
        preguntas = c.fetchall()
        conn.close()

        formatted_preguntas = [
            {"id": msg[0], "message": msg[1], "username": msg[2], "carrera": msg[3], "fecha": msg[4]} for msg in preguntas
        ]
        emit("initial_preguntas", {"messages": formatted_preguntas})

    @socketio.on("load_more_preguntas")
    def handle_load_more_preguntas(data):
        offset = data.get("offset", 0)
        limit = 10

        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()
        c.execute(
            """
            SELECT  p.id, p.texto, u.nombre, u.carrera, p.fecha
            FROM Preguntas p
            LEFT JOIN Usuarios u ON p.usuario_id = u.id
            ORDER BY p.ID DESC
            LIMIT ? OFFSET ?
            """, (limit, offset)
        )
        preguntas = c.fetchall()
        conn.close()

        formatted_preguntas = [
            {"id": msg[0], "message": msg[1], "username": msg[2], "carrera": msg[3], "fecha": msg[4]} for msg in preguntas
        ]
        has_more = len(preguntas) == limit

        emit("more_preguntas", {"messages": formatted_preguntas, "has_more": has_more})

    
    @socketio.on("send_pregunta")
    def handle_send_pregunta(data):
        token = data["token"]
        try:
            decoded_token = decode_token(token)
            user_id = decoded_token["sub"]
        except:
            return {"error": "Invalid token"}

        pregunta = data["message"]

        bolivia_tz = pytz.timezone('America/La_Paz')
        fecha_actual = datetime.now(bolivia_tz)
        fecha_actual_str = fecha_actual.strftime('%Y-%m-%d %H:%M:%S')

        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()
        c.execute(
            "INSERT INTO Preguntas (usuario_id, texto, fecha) VALUES (?, ?, ?)", (user_id, pregunta, fecha_actual_str)
        )
        conn.commit()

        c.execute(
            """
            SELECT  p.id, p.texto, u.nombre, u.carrera, p.fecha
            FROM Preguntas p
            JOIN Usuarios u ON p.usuario_id = u.id
            ORDER BY p.ID DESC LIMIT 1
            """
        )
        new_pregunta = c.fetchone()
        conn.close()

        formatted_pregunta = {
            "id": new_pregunta[0],
            "message": new_pregunta[1],
            "username": new_pregunta[2],
            "carrera": new_pregunta[3],
            "fecha": new_pregunta[4],
        }

        # Imprimir el ID y el mensaje en la consola
        print(f"ID enviado: {formatted_pregunta['id']}")
        print(f"Mensaje enviado: {formatted_pregunta['message']}")

        emit("new_pregunta", formatted_pregunta, broadcast=True)

        return {"status": "success", "message": "Pregunta enviada exitosamente"}
    @socketio.on("like_pregunta")
    def handleLikeClick(data):
        preguntas_id = data.get("messageId")  # ID de la pregunta
        username_creador = data.get("username")  # Username del creador de la pregunta
        token = data.get("token")
        
        try:
            decoded_token = decode_token(token)
            username_like = decoded_token["sub"]
            print(f"Usuario que dio like: {username_like}") 
        except Exception as e:
            print(f"Error al decodificar token: {e}")
            return {"error": "Invalid token"}

        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()

        # Verificar si el like ya existe para este usuario
        c.execute("SELECT * FROM Likes WHERE preguntas_id = ? AND usuario_like = ?", (preguntas_id, username_like))
        like_exists = c.fetchone()

        if like_exists:
            # Si el usuario ya ha dado like, eliminar el like (deslike)
            c.execute("DELETE FROM Likes WHERE id = ?", (like_exists[0],))
            
            # Decrementar el contador en la tabla `Contadores`
            c.execute("UPDATE Contadores SET contador = contador - 1 WHERE preguntas_id = ?", (preguntas_id,))
        else:
            # Si es un nuevo like
            c.execute(
                "INSERT INTO Likes (preguntas_id, usuarios_id, usuario_like) VALUES (?, ?, ?)",
                (preguntas_id, username_creador, username_like)
            )

            # Verificar si ya existe un registro en `Contadores` para esta pregunta
            c.execute("SELECT * FROM Contadores WHERE preguntas_id = ?", (preguntas_id,))
            contador_exists = c.fetchone()

            if contador_exists:
                # Si existe, incrementar el contador
                c.execute("UPDATE Contadores SET contador = contador + 1 WHERE preguntas_id = ?", (preguntas_id,))
            else:
                # Si no existe, crear un nuevo registro en `Contadores`
                c.execute(
                    "INSERT INTO Contadores (preguntas_id, contador) VALUES (?, ?)",
                    (preguntas_id, 1)
                )

        conn.commit()

        # Obtener el nuevo contador de likes después de actualizar
        c.execute("SELECT contador FROM Contadores WHERE preguntas_id = ?", (preguntas_id,))
        total_likes = c.fetchone()[0] or 0  # Obtener el contador de la tabla `Contadores`

        conn.close()

        # Emitir el evento "like_added" al frontend con el nuevo contador
        emit("like_added", {"pregunta_id": preguntas_id, "total_likes": total_likes}, broadcast=True)

        return {"status": "success", "message": "Like recibido y guardado en la base de datos"}



    @socketio.on("get_like_count")
    def get_like_count(preguntas_id):
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()

        # Obtener el total de likes de la tabla `Contadores`
        c.execute("SELECT contador FROM Contadores WHERE preguntas_id = ?", (preguntas_id,))
        result = c.fetchone()

        # Si result es None, asigna total_likes a 0
        total_likes = result[0] if result is not None else 0

        conn.close()

        # Enviar de vuelta el conteo de likes al cliente
        emit("like_count_response", {"preguntas_id": preguntas_id, "total_likes": total_likes})



    @socketio.on("check_user_like")
    def check_user_like(data):
        preguntas_id = data.get("messageId")  # ID de la pregunta
        token = data.get("token")

        try:
            decoded_token = decode_token(token)
            username_like = decoded_token["sub"]
        except:
            emit("user_like_status", {"preguntas_id": preguntas_id, "has_liked": False})
            return

        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()

        # Verificar si el usuario ya ha dado like
        c.execute("SELECT * FROM Likes WHERE preguntas_id = ? AND usuario_like = ?", (preguntas_id, username_like))
        like_exists = c.fetchone()

        has_liked = like_exists is not None  # True si existe el like, False si no

        conn.close()

        # Emitir el resultado al cliente
        emit("user_like_status", {"preguntas_id": preguntas_id, "has_liked": has_liked})
