from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.types import DomainDict
import requests
import os
from dotenv import load_dotenv

TMDB_KEY = load_dotenv()
TMDB_KEY = os.getenv('TMDB_KEY')

class ActionCarousel(Action):

    def name(self) -> Text:
        return "action_carosels"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # pegando o último input do usuário
        last_input = tracker.latest_message
        texto = last_input['text']
        # print(texto)
        
        # consumindo dados da api
        api_return = requests.get(f'https://api.themoviedb.org/3/search/movie?query={texto}&&api_key={TMDB_KEY}')
        json = api_return.json()
        
        #verificando quantos resultados foram encontrados
        total_results = json['total_results']
        if total_results == 0:
            dispatcher.utter_message(text="Desculpe, não encontrei sua pesquisa em nossa base de dados 😥")
            return []

        carosel = {"type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": []
                        }
                    }
        for i in range(total_results) if total_results < 10 else range(10):
            movie_id = str(json['results'][i]['id'])
            title = json['results'][i]['title']
            
            try:
              release_date = json['results'][i]['release_date']
              lancamento = "Desconhecido" if release_date == "" else release_date[:4]
            except:
                lancamento = "Desconhecido"
            
            #verificando data de lançamento
            
            # verificando se tem poster
            try:
              poster_img = json['results'][i]['poster_path']
              if poster_img == None:
                  imagem = 'http://seeg.eco.br/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'
              else:
                  imagem = "https://www.themoviedb.org/t/p/original" + poster_img
            except:
                imagem = "https://www.themoviedb.org/t/p/original" + poster_img
                
            #verificando titulo
            titulo = "Desconhecido" if title == None else title
                
            carosel['payload']['elements'].append(
                        {
                            "title": titulo,
                            "subtitle": "Lançamento: " + lancamento,
                            "image_url": imagem,
                            "buttons": [ 
                                {
                                "title": "Ver mais",
                                "payload": "mais detalhes: " + movie_id,
                                "type": "postback"
                                }
                            ]
                        }
                    )
        dispatcher.utter_message(text="Aqui estão os filmes que encontrei 🥤🍿")
        dispatcher.utter_message(attachment=carosel)

        return []
