require('dotenv').config()

module.exports = {
    GetMovie : {
        url : "https://api.themoviedb.org/3/",
        key: process.env.TMDB_KEY
    }
}