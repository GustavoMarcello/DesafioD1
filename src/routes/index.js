const express = require('express');
const router = express.Router();
const { getMovie } = require('../service/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET popular movies. */
router.get('/api/v1/popular_movies', async function(req, res) {
  res.send(await getMovie.getPopular())
  
});

/* GET upcomming movies. */
router.get('/api/v1/upcoming_movies', async function(req, res) {
  res.send(await getMovie.getUpcoming())
  
});

/* GET top rated movies. */
router.get('/api/v1/top_movies', async function(req, res) {
  res.send(await getMovie.getTopRated())
  
});

module.exports = router;
