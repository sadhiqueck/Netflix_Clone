import axios from "axios";

const API_KEY = '9d89e58654564dff61c7cabec0103478';
const BASE_URL = 'https://api.themoviedb.org/3';

export const IMAGE_URL = 'https://image.tmdb.org/t/p/original';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});


export const movieApi = {
 
  getTrending: () => tmdbApi.get('/trending/movie/week'),
  
  getPopular: () => tmdbApi.get('/movie/popular'),

  getTopRated: () => tmdbApi.get('/movie/top_rated'),
  
  getUpcoming: () => tmdbApi.get('/movie/upcoming'),
  
  getMovieDetails: (movieId) => tmdbApi.get(`/movie/${movieId}`, {
    params: { append_to_response: 'videos,credits,similar' }
  }),
  
  searchMovies: (query) => tmdbApi.get('/search/movie', {
    params: { query }
  }),
  
};

 
export const fetchMovieDetailsWithVideos = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};


export default tmdbApi;