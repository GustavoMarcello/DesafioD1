const mongoose = require('mongoose');

mongoose.Promise = global.Promise
// conectando ao banco
mongoose.connect('mongodb://localhost/tmdb').then(() =>{
  console.log("Mongodb Conectado...")
}).catch((err)=>{
  console.log("Erro: " + err)
});

//construindo schema
const filmesSchema = mongoose.Schema({
  list: [{
     id: {type: Number}, 
     title: {type: String}, 
     release_date: {type: String}, 
     poster_path: {type: String}, 
     overview: {type: String}
   }]
  })

// definindo modelos
const popularModel = mongoose.model('popular', filmesSchema)
const topRatedModel = mongoose.model('topRated', filmesSchema)
const upcomingModel = mongoose.model('release', filmesSchema)

module.exports = {popularModel, upcomingModel, topRatedModel}

