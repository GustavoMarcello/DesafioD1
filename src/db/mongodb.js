const {getMovie} = require('../service/index')
const {insertData} = require('./functions')
const {dropCollection} = require('./functions')

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/tmdb";

MongoClient.connect(url, async function(err, db) {
  if (err) throw err;
  // conectando no banco
  const dbo = db.db("tmdb");
  // consumindo api para coleta de dados
  const popMovie = await getMovie.getPopular()
  const topMovie = await getMovie.getTopRated()
  const upcMovie = await getMovie.getUpcoming()

  // gerando obj para inserção ao bd
  const myobj = [
    { popular: popMovie},
    { topRated: topMovie},
    { upcomming: upcMovie},
  ];

  // criando coleção e inserindo dados
  dbo.collection("films").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result.length);
    // verificando dados no bd
    if (result.length === 0){
      // insere dados iniciais no banco
      insertData(myobj)
    } else {
      dropCollection()
      insertData(myobj)
    }
  });
});
  

