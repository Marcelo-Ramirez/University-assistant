from flask import Blueprint, jsonify, request, render_template
from flask_jwt_extended import create_access_token
import sqlite3
from services.chatbot.chatbot import get_chatbot_response
from models.data_base import DATABASE

routes_bp = Blueprint('routes_bp', __name__)

# Middleware para procesar rutas desconocidas
@routes_bp.before_app_request
def check_route():
    known_routes = ["/", "/get", "/save", "/register", "/login"]
    if request.path not in known_routes and 'static' not in request.path:
        return render_template("index.html")

# Ruta para servir la página principal (index.html)
@routes_bp.route("/")
def home():
    return render_template("index.html")

# Ruta para obtener la respuesta del chatbot
@routes_bp.route("/get", methods=["POST"])
def get_bot_response():
    user_input = request.json["message"]
    response = get_chatbot_response(user_input)  # Aquí llamas a tu función de chatbot
    return jsonify({"response": response})

# Ruta para guardar un mensaje en la base de datos
@routes_bp.route("/save", methods=["POST"])
def save_message():
    user_input = request.json["message"]
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute("INSERT INTO Messages (message) VALUES (?)", (user_input,))
    conn.commit()
    conn.close()
    return jsonify({"response": "Mensaje guardado"})

# Ruta para registrar un nuevo usuario
@routes_bp.route("/register", methods=["POST"])
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

# Ruta para iniciar sesión y generar un token JWT
@routes_bp.route("/login", methods=["POST"])
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
