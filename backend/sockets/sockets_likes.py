from flask_socketio import emit
import sqlite3
from flask_jwt_extended import decode_token, jwt_required, get_jwt_identity
from models.data_base import DATABASE

def register_likes(socketio):

    @socketio.on("like_pregunta")
    def handleLikeClick(data):
        preguntas_id = data.get("messageId")
        username_creador = data.get("username")
        token = data.get("token")

        # Decodificar el token
        try:
            decoded_token = decode_token(token)
            username_like = decoded_token["sub"]
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

        # Obtener el nuevo contador de likes
        c.execute("SELECT contador FROM Contadores WHERE preguntas_id = ?", (preguntas_id,))
        total_likes = c.fetchone()[0] or 0

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
        total_likes = result[0] if result else 0

        conn.close()

        # Enviar de vuelta el conteo de likes al cliente
        emit("like_count_response", {"preguntas_id": preguntas_id, "total_likes": total_likes})


    @socketio.on("check_user_like")
    def check_user_like(data):
        preguntas_id = data.get("messageId")
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

        has_liked = like_exists is not None

        conn.close()

        # Emitir el resultado al cliente
        emit("user_like_status", {"preguntas_id": preguntas_id, "has_liked": has_liked})