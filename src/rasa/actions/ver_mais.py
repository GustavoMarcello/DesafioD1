
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.types import DomainDict
from googletrans import Translator
import requests
import os
from dotenv import load_dotenv

TMDB_KEY = load_dotenv()
TMDB_KEY = os.getenv('TMDB_KEY')

class ActionVerMais(Action):
    def name(self) -> Text:
        return "action_ver_mais"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        # pegando o último input do usuário
        last_input = tracker.latest_message
        texto = last_input['text']
        texto = texto.lower()
        # tratando input indesejado
        if texto == "ver mais" or texto == "mais detalhes:":
            dispatcher.utter_message("Preciso que você **clique** no botão para que eu retorne as informações do filme desejado 😕. \n\nDigite novamente o **título** do filme e clique em \"*ver mais*\".")
            return[]
        id = texto[15:]
        print(f'movie id: {id}')
        
        #consumindo api
        api_return = requests.get(f'https://api.themoviedb.org/3/movie/{id}?api_key={TMDB_KEY}')
        json = api_return.json()
        
        # traduzindo overview para pt
        try:
          overview = json['overview']
          if len(overview) == 0:
              overview = 'not found'
        except:
            overview = 'not found'
            
        translator = Translator()
        
        # verificando poster
        try:
          poster_img = json['poster_path']
          if poster_img == None:
              imagem = 'http://seeg.eco.br/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'
          else:
              imagem = "https://www.themoviedb.org/t/p/original" + poster_img
        except:
            imagem = "https://www.themoviedb.org/t/p/original" + poster_img
            
        #verificando data de lançamento
        try:
          release_date = json['release_date']
          lancamento = "Desconhecido" if release_date == "" else release_date[:4]
        except:
          lancamento = "Desconhecido" if release_date == "" else release_date[:4]
        
        #verificando avaliacao
        try:
          vote_average = json['vote_average']
          avaliacao = "Desconhecido" if vote_average == None else vote_average
        except:
          avaliacao = "Desconhecido" if vote_average == None else vote_average
        
        #verificando titulo
        try:
          title = json['title']
          titulo = "Desconhecido" if title == None else title
        except:
          titulo = "Desconhecido" if title == None else title
        
        translation = translator.translate(overview, src='en', dest='pt')
        # outputs
        dispatcher.utter_message(image=imagem)
        dispatcher.utter_message(text=f'**Título**: {titulo}')
        dispatcher.utter_message(text=f'**Lançamento**: {lancamento}')
        dispatcher.utter_message(text=f'**Avaliação**: {avaliacao}')
        dispatcher.utter_message(text=f'**Sinopse**: {translation.text}')
        dispatcher.utter_message(text=f'Digite abaixo o próximo filme que deseje consultar 🧐')
        
        return []

