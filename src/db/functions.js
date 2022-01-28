const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/tmdb";

function insertData(myobj) { 
    MongoClient.connect(url, async function(err, db) {
      if (err) throw err;
      const dbo = db.db("tmdb");
  
      //inserindo dados ao db
      await dbo.collection("films").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    }); 
    });
  }

function dropCollection(){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("tmdb");
        dbo.collection("films").drop(function(err, delOK) {
          if (err) throw err;
          if (delOK) console.log("Collection deleted");
          db.close();
        });
      });
}

  module.exports = {
      insertData,
      dropCollection
  }