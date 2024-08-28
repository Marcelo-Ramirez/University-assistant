import sqlite3

# Conectar a la base de datos
conn = sqlite3.connect('database.db')

# Crear un cursor para ejecutar comandos SQL
cursor = conn.cursor()

# Obtener la lista de tablas
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

# Imprimir la estructura de cada tabla
"""for table_name in tables:
    print(f"Estructura de la tabla {table_name[0]}:")
    cursor.execute(f"PRAGMA table_info({table_name[0]});")
    columns = cursor.fetchall()
    for column in columns:
        print(column)
    print()
"""
# Obtener y mostrar los usuarios y sus respectivas carreras en la tabla 'Usuarios'
"""print("Usuarios y sus respectivas carreras en la tabla 'Usuarios':")
cursor.execute("SELECT nombre, carrera FROM Usuarios;")
users = cursor.fetchall()
for user in users:
    print(f"Usuario: {user[0]}, Carrera: {user[1]}")
"""

# Obtener una lista de todas las tablas en la base de datos
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

# Verificar que haya al menos 3 tablas
if len(tables) > 2:
    # Imprimir la estructura de la tabla en la posición 2
    table_name = tables[2][0]  # Acceder a la tercera tabla (posición 2)
    print(f"Estructura de la tabla {table_name}:")
    cursor.execute(f"PRAGMA table_info({table_name});")
    columns = cursor.fetchall()
    for column in columns:
        print(column)
    print()
else:
    print("No hay suficientes tablas en la base de datos para acceder a la posición 2.")


# Cambiar el mensaje para reflejar la consulta a la tabla 'pregunta'
print("Mostrando todos los campos de la tabla 'pregunta':")

# Realizar la consulta para obtener todos los campos de la tabla 'pregunta'
cursor.execute("SELECT * FROM preguntas;")

# Obtener todos los resultados de la consulta
preguntas = cursor.fetchall()

# Obtener los nombres de las columnas de la tabla para imprimirlos
column_names = [description[0] for description in cursor.description]

# Imprimir el encabezado con los nombres de las columnas
print(", ".join(column_names))

# Iterar sobre cada registro de la tabla 'pregunta' y mostrar sus campos
for pregunta in preguntas:
    print(", ".join(str(campo) for campo in pregunta))



# Cerrar la conexión
conn.close()
