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
    c.execute("INSERT INTO messages (message) VALUES (?)", (user_input,))
    conn.commit()
    conn.close()
    return jsonify({"response": "Gracias por el aporte"})

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data["username"]
    password = data["password"]

    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute(
        "INSERT INTO Usuarios (password, nombre, correo, carrera) VALUES (?, ?, ?, ?)",
        (password, username, username + "@example.com", ""),
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
        SELECT m.message, u.nombre, u.carrera
        FROM messages m
        LEFT JOIN Usuarios u ON m.user_id = u.id
    """
    )
    messages = c.fetchall()
    conn.close()
    formatted_messages = [
        {"message": msg[0], "username": msg[1], "carrera": msg[2]} for msg in messages
    ]
    emit("initial_messages", {"messages": formatted_messages})

@socketio.on("send_message")
def handle_send_message(data):
    token = data["token"]
    try:
        decoded_token = decode_token(token)
        user_id = decoded_token["sub"]
    except:
        emit("error", {"message": "Invalid token"})
        return

    message = data["message"]
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute(
        "INSERT INTO messages (user_id, message) VALUES (?, ?)", (user_id, message)
    )
    conn.commit()
    c.execute(
        """
        SELECT m.message, u.nombre, u.carrera
        FROM messages m
        JOIN Usuarios u ON m.user_id = u.id
        ORDER BY m.id DESC LIMIT 1
    """
    )
    new_message = c.fetchone()
    conn.close()

    formatted_message = {
        "message": new_message[0],
        "username": new_message[1],
        "carrera": new_message[2],
    }
    emit("new_message", formatted_message, broadcast=True)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000)
