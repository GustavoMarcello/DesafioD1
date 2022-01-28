const {getMovie} = require('../service/index')

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/tmdb";

// criação do bd
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

// // lista de nomes das coleções
// const collectionList = ["popular", "topRated", "upcomming"];
// const methodsList = ["getPopular", "getTopRated", "getUpcomming"];

// criação das coleções
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db("tmdb");
    dbo.createCollection("films", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
  
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db("tmdb");
    const myobj = [
        { popular: getMovie.getPopular()},
        { topRated: getMovie.getTopRated()},
        { upcomming: getMovie.getUpcomming()},
      ];
    dbo.collection("films").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    }); 
});
