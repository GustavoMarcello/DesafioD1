
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.types import DomainDict
from translate import Translator
import requests


class SayInputUserSearch(FormValidationAction):

    def name(self) -> Text:
        # define o nome da action
        return "validate_inputUser_form_search"

    def validate_inputUser(self, slot_value: Any, dispatcher: CollectingDispatcher, tracker: Tracker,
            domain: DomainDict) -> Dict[Text, Any]:
        
        # recebe o input "slot" do usuário
        inputUser = tracker.get_slot('inputUser')
        print(f'inputUser: {inputUser}')
        
        api_return = requests.get(f'https://api.themoviedb.org/3/search/movie?query={inputUser}&&api_key=7ec6bf3c95374d2e583d92229608f0d9')
        json = api_return.json()
        title = json['results'][0]['title']
        release_date = json['results'][0]['release_date']
        vote_average = json['results'][0]['vote_average']
        overview = json['results'][0]['overview']
        # traduzindo overview para pt
        translator = Translator(to_lang="pt")
        ovw_trnsl = translator.translate(overview)
        dispatcher.utter_message(text='Aqui o que encontrei de primeira 🧐')
        dispatcher.utter_message(text=f'**Título**: {title}')
        dispatcher.utter_message(text=f'**Lançamento**: {release_date[:4]}')
        dispatcher.utter_message(text=f'**Avaliação**: {vote_average}')
        dispatcher.utter_message(text=f'**Sinopse**: {overview}')
        return {}


# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []

# https://rasa.com/docs/rasa/custom-actions