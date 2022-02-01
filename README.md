# <p align=center>📽 MooVIE</p>
<img src="https://cdn.wallpapersafari.com/38/39/mebcYL.jpg" style="width:1000px;height:250px;"/>

### <p align=center>Desafio proposto pela [D1 Smarkio](https://www.smarkio.com.br/) em criar uma conta na [TMDb](https://www.themoviedb.org/?language=pt-BR/) e consumir sua API para consulta de filmes e séries.
</p>

## 📌 ***Principais Objetivos***
- Criar uma conta na TMDb
- Gerar uma chave de API
- Criar uma interface gráfica
- Listar os filmes consumidos via API
- Armazenar dados em um Banco de dados
- Utilizar Backend em node
- Criar próprias APIs em Node
- Chatbot para consulta e informações dos filmes

## 🖱 ***Pré-requisitos***
- Node: v16.13.2
- Axios": 0.25.0
- Python: 3.8.8
- Rasa: 2.8.22
- Spacy: 3.1.2
- Googletrans: 3.1.0a0
- Dotenv: 14.3.2
- Mongodb: 4.3.1

## 🖥 Página Principal
<img src="https://github.com/GustavoMarcello/DesafioD1/blob/main/src/img/MooVIE.png"/>

Todo o Backend foi feito em node, consumindo a API pela biblioteca `axios` e armazenando informações desejadas ao `mongodb` em paralelo com as APIs criadas para consumo do Frontend.
Ao front utilizamos um carrossel que consome os posteres de cada filme e apresenta ao usuário. Toda a estilização foi feita em CSS.

O Chatbot disponível no canto inferior direito foi desenvolvido em Rasa, e auxilia o usuário a pesquisar sobre filmes, retornando um carrossel com o que foi pesquisado, e disponibiliza mais informações sobre o filme caso o usuário queira, clicando em ***VER MAIS***.

<div align=center><img src="https://github.com/GustavoMarcello/DesafioD1/blob/main/src/img/Chatbot%201%20MooVIE.png" style="width:300px;height:550px;"/>  <img src="https://github.com/GustavoMarcello/DesafioD1/blob/main/src/img/Chatbot%202%20MooVIE.png" style="width:300px;height:550px;"/></div>


## 📚 Como utilizar
- Crie um arquivo `.env` na raiz do seu projeto, e adicione sua chave da API do TMDb.
```
TMDB_KEY=XXXxXxXxxXxxxxXXxXXXXxx
```
- Serão necessários 3 terminais para rodar os servidores de `node`, `rasa core` e `rasa action`.
- O primeiro servidor (node) deve ser aberto na raíz do projeto e executado a partir do comando
```
node index.js
```
- Para utilização do bot, será necessário o treinamento do modelo e hospedagem dos demais servidores `rasa`. Faça o download da biblioteca em português do Spacy para o treinamento.
```
spacy download pt_core_news_lg
```
- **Acesse a pasta rasa**, e treine o chatbot.
```
rasa train
```
- Ainda na pasta rasa, abra mais dois terminais para executar os servidores `core` e `action` do chatbot
```
rasa run --enable-api --cors "*"
```
```
rasa run actions
```
<img src="https://github.com/GustavoMarcello/DesafioD1/blob/main/src/img/terminal%20MooVIE.png"/>

- Com os 3 servidores online, acesse `localhost:3000` em seu navegador para visualizar a página.

# 👨‍💻 ***Desenvolvedores***
- [Caio Gabriel Ferreira](https://www.linkedin.com/in/caio-gferreira/)
- [Gustavo Marcello](https://www.linkedin.com/in/gustavo-goetze-marcello-66275715a/)
