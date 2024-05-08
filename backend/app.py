from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import chatbot


# Crea una instancia de la aplicación Flask.
app = Flask(__name__, static_folder="templates/static")
CORS(app)

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

# Ejecuta el servidor si el script se ejecuta como programa principal.
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
