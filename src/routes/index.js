const express = require('express');
const router = express.Router();
const { getMovie } = require('../service/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/api/v1/popular_movies', async function(req, res) {
  res.send(await getMovie.getPopularMovies())
  // res.send("hii")
});

module.exports = router;
