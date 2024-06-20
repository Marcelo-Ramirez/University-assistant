import sqlite3

# Conectar a la base de datos
conn = sqlite3.connect('users.db')

# Crear un cursor para ejecutar comandos SQL
cursor = conn.cursor()

# Obtener la lista de tablas
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

# Imprimir la estructura de cada tabla
for table_name in tables:
    print(f"Estructura de la tabla {table_name[0]}:")
    cursor.execute(f"PRAGMA table_info({table_name[0]});")
    columns = cursor.fetchall()
    for column in columns:
        print(column)
    print()

# Cerrar la conexión
conn.close()
