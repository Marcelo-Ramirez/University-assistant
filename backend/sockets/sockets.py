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