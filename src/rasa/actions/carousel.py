from .__init__ import *

# consumindo key
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

        # header do payload de carrossel
        carousel = {"type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": []
                        }
                    }
        # verificando e definindo n° de elementos do carrossel
        for i in range(total_results) if total_results < 10 else range(10):
            movie_id = str(json['results'][i]['id'])
            
            try:
              release_date = json['results'][i]['release_date']
              lancamento = "Desconhecido" if release_date == "" else release_date[:4]
            except:
                lancamento = "Desconhecido"
            
            #verificando data de lançamento
            
            # verificando se tem poster
            try:
                poster_img = json['results'][i]['poster_path']
                imagem = "https://www.themoviedb.org/t/p/original" + poster_img
            except:
                imagem = 'http://seeg.eco.br/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'
                
            title = json['results'][i]['title']
            #verificando titulo
            titulo = "Desconhecido" if title == None else title
                
            carousel['payload']['elements'].append(
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
        dispatcher.utter_message(attachment=carousel)

        return []
