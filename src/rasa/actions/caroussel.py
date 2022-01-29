from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.types import DomainDict
from googletrans import Translator
import requests

class ActionCarousel(Action):

    def name(self) -> Text:
        return "action_carousels"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # pegando o último input do usuário
        last_input = tracker.latest_message
        texto = last_input['text']
        # print(texto)
        
        # consumindo dados da api
        api_return = requests.get(f'https://api.themoviedb.org/3/search/movie?query={texto}&&api_key=7ec6bf3c95374d2e583d92229608f0d9')
        json = api_return.json()
        
        #verificando quantos resultados foram encontrados
        total_results = json['total_results']
        if total_results == 0:
            dispatcher.utter_message(text="Desculpe, não encontrei sua pesquisa em nossa base de dados 😥")
            return []

        carosseu = {"type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": []
                        }
                    }
        for i in range(total_results) if total_results < 5 else range(5):
            movie_id = str(json['results'][i]['id'])
            title = json['results'][i]['title']
            poster_img = json['results'][i]['poster_path']
            release_date = json['results'][i]['release_date']
            
            #verificando data de lançamento
            lancamento = "Desconhecido" if release_date == None else release_date[:4]
            
            # verificando se tem poster
            if poster_img == None:
                imagem = 'http://seeg.eco.br/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'
            else:
                imagem = "https://www.themoviedb.org/t/p/original" + poster_img
                
            #verificando titulo
            titulo = "Desconhecido" if title == None else title
                
            carosseu['payload']['elements'].append(
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
        dispatcher.utter_message(attachment=carosseu)

        return []
