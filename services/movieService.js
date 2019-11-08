/* eslint-disable max-len */
const axios = require('axios');
const API_URL = 'https://jsonmock.hackerrank.com/api/movies/search/?Title=';

/**
 * desc.
 * @param {Object} req object that contains API request payload.
 * @param {Object} res object that contains API response object.
 * @param {Object} title object that contains API response object.
 * @return {int} etc.
 */
async function getMovies(req, res) {
  axios.get(API_URL + req.query.title)
      .then((response) => {
        const numberOfPages = response.data.total_pages;
        const numberOfMovies = response.data.total;
        const arrayUrls = getMoviesApiPageUrl(numberOfPages, req);
        const promiseArray = arrayUrls.map((url) => axios.get(url));
        axios.all(promiseArray)
            .then((function(results) {
              const moviesByYearJson = getMovieCountByYear(results);
              const totalMovies = createTotalMoviesObjects(moviesByYearJson, numberOfMovies);
              res.send(totalMovies);
            }));
      });
}
exports.getMovies = getMovies;

/**
 * desc.
 * @param {Object} numberOfPages object that contains API request payload.
 * @param {Object} req object that contains API request payload.
 * @return {Object} arrayUrls.
 */
function getMoviesApiPageUrl(numberOfPages, req) {
  const arrayUrls = [];
  for (let index = 1; index <= numberOfPages; index++) {
    const url = API_URL + req.query.title + '&page=' + index;
    arrayUrls.push(url);
  }
  return arrayUrls;
}
/**
 * desc.
 * @param {Object} moviesByYearJson object that contains API request payload.
 * @param {Object} numberOfMovies object that contains API request payload.
 * @return {Object} totalMovies.
 */
function createTotalMoviesObjects(moviesByYearJson, numberOfMovies) {
  const totalMovies = {};
  totalMovies.moviesByYear = Object.keys(moviesByYearJson).map(function(key) {
    return {year: key, movies: moviesByYearJson[key]};
  });
  totalMovies.total = numberOfMovies;
  return totalMovies;
}
/**
 * desc.
 * @param {Object} results object that contains API request payload.
 * @return {Object} etc.
 */
function getMovieCountByYear(results) {
  const allPages = results.map((r) => r.data.data);
  const moviesByYearJson = allPages.flat().reduce(function(accumulator, currentObject) {
    accumulator[currentObject.Year] = ++accumulator[currentObject.Year] || 1;
    console.log(currentObject);
    return accumulator;
  }, {});
  return moviesByYearJson;
}
