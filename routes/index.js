// eslint-disable-next-line max-len
const {getMoviesCount: getMoviesCount, getMovies: getMovies} = require('../services/movieService');

/* eslint-disable max-len */

const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index, acesse a rota: /movies/count?title=');
});

/* GET Movies. */
router.get('/movies', function(req, res, next) {
  getMovies(req, res);
});

/* GET MoviesCountByYear. */
router.get('/movies/count', function(req, res, next) {
  // res.send('deu certo, rota movies/count');
  getMoviesCount(req, res);
});

module.exports = router;


