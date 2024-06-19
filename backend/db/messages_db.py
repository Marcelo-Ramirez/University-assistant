import sqlite3
import os

# Ruta de la base de datos
MESSAGES_DATABASE = os.path.join(os.getcwd(), 'data', 'messages.db')

# Inicializa la base de datos de mensajes
def init_messages_db():
    if not os.path.exists(os.path.dirname(MESSAGES_DATABASE)):
        os.makedirs(os.path.dirname(MESSAGES_DATABASE))
    conn = sqlite3.connect(MESSAGES_DATABASE)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, message TEXT)''')
    conn.commit()
    conn.close()
