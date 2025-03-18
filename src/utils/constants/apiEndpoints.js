import { API_KEY } from '@env';

const BASE_URL = 'http://www.omdbapi.com/';

const getMovies = {
  movieSearch: (searchTerm) => `${BASE_URL}?type=movie&apikey=${API_KEY}&s=${searchTerm}`,
  movieDetails: (id) => `${BASE_URL}?apikey=${API_KEY}&i=${id}`,
};

export default getMovies;
