# Usa una imagen base oficial de Python
FROM python:3.10-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo requirements.txt al directorio de trabajo
COPY requirements.txt .

# Actualiza pip, instala las dependencias listadas en requirements.txt, y limpia el cache de apt
RUN apt-get update && apt-get install -y sqlite3 && apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copia el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Descarga los recursos necesarios de NLTK
RUN python -m nltk.downloader punkt wordnet omw-1.4

# Crea el directorio para la base de datos
RUN mkdir -p /app/data

# Exponer el puerto en el que la aplicación estará corriendo
EXPOSE 5000

# Define el comando por defecto para ejecutar la aplicación
CMD ["python", "app.py"]
