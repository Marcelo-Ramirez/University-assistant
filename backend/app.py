from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, decode_token
from flask_socketio import SocketIO, emit
import sqlite3
import os
import chatbot
from db.db import init_db, DATABASE

app = Flask(__name__, static_folder="templates/static")
CORS(app)
app.config["JWT_SECRET_KEY"] = "super-secret-key"
jwt = JWTManager(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Inicializar la base de datos
init_db()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get", methods=["POST"])
def get_bot_response():
    user_input = request.json["message"]
    response = chatbot.get_chatbot_response(user_input)
    return jsonify({"response": response})

@app.route("/save", methods=["POST"])
def save_message():
    user_input = request.json["message"]
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute("INSERT INTO Messages (message) VALUES (?)", (user_input,))
    conn.commit()
    conn.close()
    return jsonify({"response": "Gracias por el aporte"})

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    carrera = data.get("carrera")

    if not username or not password or not carrera:
        return jsonify({"message": "Missing fields"}), 400

    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute(
        "INSERT INTO Usuarios (password, nombre, correo, carrera) VALUES (?, ?, ?, ?)",
        (password, username, username + "@example.com", carrera),
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "User registered successfully"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data["username"]
    password = data["password"]

    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute(
        "SELECT * FROM Usuarios WHERE nombre = ? AND password = ?", (username, password)
    )
    user = c.fetchone()
    conn.close()

    if user:
        access_token = create_access_token(identity=user[0])
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Bad username or password"}), 401

@socketio.on("connect")
def handle_connect(auth):
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute(
        """
        SELECT p.texto, u.nombre, u.carrera
        FROM Preguntas p
        LEFT JOIN Usuarios u ON p.usuario_id = u.id
    """
    )
    preguntas = c.fetchall()
    conn.close()
    formatted_preguntas = [
        {"message": msg[0], "username": msg[1], "carrera": msg[2]} for msg in preguntas
    ]
    emit("initial_preguntas", {"messages": formatted_preguntas})

@socketio.on("send_pregunta")
def handle_send_pregunta(data):
    token = data["token"]
    try:
        decoded_token = decode_token(token)
        user_id = decoded_token["sub"]
    except:
        emit("error", {"message": "Invalid token"})
        return

    pregunta = data["message"]
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute(
        "INSERT INTO Preguntas (usuario_id, texto) VALUES (?, ?)", (user_id, pregunta)
    )
    conn.commit()
    c.execute(
        """
        SELECT p.texto, u.nombre, u.carrera
        FROM Preguntas p
        JOIN Usuarios u ON p.usuario_id = u.id
        ORDER BY p.id DESC LIMIT 1
    """
    )
    new_pregunta = c.fetchone()
    conn.close()

    formatted_pregunta = {
        "message": new_pregunta[0],
        "username": new_pregunta[1],
        "carrera": new_pregunta[2],
    }
    emit("new_pregunta", formatted_pregunta, broadcast=True)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000)
