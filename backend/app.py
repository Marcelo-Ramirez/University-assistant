from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import sqlite3
import os
import chatbot

# Configuración de Flask
app = Flask(__name__, static_folder="templates/static")
CORS(app)

# Ruta de la base de datos
DATABASE = os.path.join(os.getcwd(), 'data', 'messages.db')

# Inicializa la base de datos SQLite.
def init_db():
    if not os.path.exists(os.path.dirname(DATABASE)):
        os.makedirs(os.path.dirname(DATABASE))
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, message TEXT)''')
    conn.commit()
    conn.close()

@app.route("/")
def home():
    # Renderiza la página principal del chatbot.
    return render_template("index.html")

@app.route("/get", methods=["POST"])
def get_bot_response():
    # Obtiene la respuesta del bot a partir de la entrada del usuario.
    user_input = request.json['message']
    response = chatbot.get_chatbot_response(user_input)
    return jsonify({"response": response})

@app.route("/save", methods=["POST"])
def save_message():
    # Guarda el mensaje del usuario en la base de datos.
    user_input = request.json['message']
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute("INSERT INTO messages (message) VALUES (?)", (user_input,))
    conn.commit()
    conn.close()
    return jsonify({"response": "Gracias por el aporte"})

# Ejecuta el servidor si el script se ejecuta como programa principal.
if __name__ == "__main__":
    init_db()
    app.run(host='0.0.0.0', port=5000)
