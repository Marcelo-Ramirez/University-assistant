import random
import json
import pickle
import numpy as np
import nltk
from nltk.stem import WordNetLemmatizer
from keras.models import load_model
import os

# Descargar recursos necesarios de NLTK si no están disponibles
try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('corpora/wordnet')
    nltk.data.find('corpora/omw-1.4')
except LookupError:
    nltk.download('punkt')
    nltk.download('wordnet')
    nltk.download('omw-1.4')
# Inicializa el lematizador para procesar las palabras.
lemmatizer = WordNetLemmatizer()
# Carga el archivo JSON con las intenciones para el chatbot.
intents = json.loads(open('services/chatbot/intents.json', encoding='utf-8').read())
# Carga las palabras y clases del modelo desde archivos pickle.
words_path = os.path.join(os.path.dirname(__file__), 'words.pkl')
words = pickle.load(open(words_path, 'rb'))
classes_path = os.path.join(os.path.dirname(__file__), 'classes.pkl')
classes = pickle.load(open(classes_path, 'rb'))
# Carga el modelo de red neuronal entrenado.
model_path = os.path.join(os.path.dirname(__file__), 'chatbot_model.h5')
model = load_model(model_path)


def clean_up_sentence(sentence):
    # Tokeniza y lematiza cada palabra en la oración.
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]  # Convertimos a minúsculas
    return sentence_words

def bag_of_words(sentence):
    # Crea un 'bag of words' para la frase dada.
    sentence_words = clean_up_sentence(sentence)
    # Inicializa un vector de ceros del tamaño del vocabulario.
    bag = [0] * len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:  # Marca con 1 la presencia de la palabra.
                bag[i] = 1
    return np.array(bag)

def predict_class(sentence):
    # Predice la categoría de la frase.
    bow = bag_of_words(sentence)
    res = model.predict(np.array([bow]))[0]
    max_index = np.where(res == np.max(res))[0][0]
    category = classes[max_index]
    return category

def get_response(tag):
    # Selecciona una respuesta basada en la etiqueta de la intención.
    list_of_intents = intents['intents']
    for i in list_of_intents:
        if i["tag"] == tag:
            return random.choice(i['responses'])

def get_chatbot_response(user_input):
    tag = predict_class(user_input)
    return get_response(tag)

def get_chatbot_response(user_input):
    # Crear el 'bag of words' para la entrada del usuario
    bow = bag_of_words(user_input)
    # Obtener las predicciones del modelo
    res = model.predict(np.array([bow]))[0]
    # Encontrar el índice de la clase con la mayor probabilidad
    max_index = np.where(res == np.max(res))[0][0]
    # Obtener la etiqueta de la intención con la mayor probabilidad
    tag = classes[max_index]
    # Obtener el porcentaje de certeza
    percentage = float(res[max_index]) * 100
    # Formatear la respuesta con el porcentaje de certeza
    response = get_response(tag)
    return f"{response} (Certainty: {percentage:.2f}%)"