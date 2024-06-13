import random
import json
import pickle
import numpy as np
import nltk
from nltk.stem import WordNetLemmatizer
from keras.models import load_model

# Inicializa el lematizador para procesar las palabras.
lemmatizer = WordNetLemmatizer()
# Carga el archivo JSON con las intenciones para el chatbot.
intents = json.loads(open('intents.json', encoding='utf-8').read())
# Carga las palabras y clases del modelo desde archivos pickle.
words = pickle.load(open('words.pkl', 'rb'))
classes = pickle.load(open('classes.pkl', 'rb'))
# Carga el modelo de red neuronal entrenado.
model = load_model('chatbot_model.h5')

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
