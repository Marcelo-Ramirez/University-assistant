import sqlite3
import os

# Ruta de la base de datos
DATABASE = os.path.join(os.getcwd(), 'data', 'database.db')

# Inicializa la base de datos de mensajes y usuarios
def init_db():
    if not os.path.exists(os.path.dirname(DATABASE)):
        os.makedirs(os.path.dirname(DATABASE))
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute('PRAGMA foreign_keys = ON')
    
    ################################################
    #### CREACION DE TABLAS DE LA BASE DE DATOS ####
    c.execute('''
    CREATE TABLE IF NOT EXISTS Usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        password TEXT NOT NULL,
        nombre TEXT NOT NULL,
        correo TEXT NOT NULL UNIQUE,
        carrera TEXT
    )
    ''')
    
    c.execute('''
    CREATE TABLE IF NOT EXISTS Preguntas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        texto TEXT NOT NULL,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
    )
    ''')
    
    c.execute('''
    CREATE TABLE IF NOT EXISTS Respuestas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pregunta_id INTEGER,
        usuario_id INTEGER,
        texto TEXT NOT NULL,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (pregunta_id) REFERENCES Preguntas(id),
        FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
    )
    ''')
    
    c.execute('''
    CREATE TABLE IF NOT EXISTS Imagenes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pregunta_id INTEGER,
        url TEXT NOT NULL,
        FOREIGN KEY (pregunta_id) REFERENCES Preguntas(id)
    )
    ''')
    
    c.execute('''
    CREATE TABLE IF NOT EXISTS Likes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        respuesta_id INTEGER,
        usuario_id INTEGER,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (respuesta_id) REFERENCES Respuestas(id),
        FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
    )
    ''')
    
    c.execute('''
    CREATE TABLE IF NOT EXISTS Messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        message TEXT,
        FOREIGN KEY (user_id) REFERENCES Usuarios(id)
    )
    ''')
    
    conn.commit()
    conn.close()

# Llama a la función de inicialización
init_db()
