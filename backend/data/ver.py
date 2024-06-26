import sqlite3

# Conectar a la base de datos
conn = sqlite3.connect('database.db')

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

# Obtener y mostrar los usuarios y sus respectivas carreras en la tabla 'Usuarios'
print("Usuarios y sus respectivas carreras en la tabla 'Usuarios':")
cursor.execute("SELECT nombre, carrera FROM Usuarios;")
users = cursor.fetchall()
for user in users:
    print(f"Usuario: {user[0]}, Carrera: {user[1]}")

# Cerrar la conexión
conn.close()
