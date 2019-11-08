const {getMovies} = require('../services/movieService');

/* eslint-disable max-len */

const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index');
});

/* GET Movies. */
router.get('/movies/count', function(req, res, next) {
  // res.send('deu certo, rota movies/count');
  getMovies(req, res);
});

module.exports = router;


