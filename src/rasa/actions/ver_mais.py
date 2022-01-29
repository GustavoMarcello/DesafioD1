
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.types import DomainDict
from googletrans import Translator
import requests


class ActionVerMais(Action):

    def name(self) -> Text:
        return "action_ver_mais"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        # # recebe o input "slot" do usuário
        # movie_title = tracker.get_slot('movie_title')
        # print(f'movie_title: {movie_title}')
        
        # pegando o último input do usuário
        last_input = tracker.latest_message
        texto = last_input['text']
        id = texto[15:]
        print('ACTION VER MAIS!!')
        print(id)
        
        api_return = requests.get(f'https://api.themoviedb.org/3/movie/{id}?api_key=7ec6bf3c95374d2e583d92229608f0d9')
        json = api_return.json()
        title = json['title']
        release_date = json['release_date']
        vote_average = json['vote_average']
        overview = json['overview']
        poster_img = json['poster_path']
        
        # traduzindo overview para pt
        if len(overview) == 0:
            overview = 'not found'
        translator = Translator()
        
        # verificando poster
        if poster_img == None:
            imagem = 'http://seeg.eco.br/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'
        else:
            imagem = "https://www.themoviedb.org/t/p/original" + poster_img
            
        #verificando data de lançamento
        lancamento = "Desconhecido" if release_date == None else release_date[:4]
        
        #verificando avaliacao
        avaliacao = "Desconhecido" if vote_average == None else vote_average
        
        #verificando titulo
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

