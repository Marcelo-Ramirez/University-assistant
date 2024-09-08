from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
from routes.routes import routes_bp
from sockets.sockets import register_sockets
from models.data_base import init_db

app = Flask(__name__, static_folder="templates/static")
CORS(app)
app.config["JWT_SECRET_KEY"] = "super-secret-key"
app.config["DEBUG"] = True  # Activa el modo de depuración
jwt = JWTManager(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Inicializar la base de datos
init_db()

# Registrar el blueprint de rutas
app.register_blueprint(routes_bp)

# Registrar los sockets
register_sockets(socketio)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
