import axios from 'axios';

export {
  fetchTrendingMovies,
  fetchMoviesByQuery,
  fetchMovieDetails,
  fetchMovieReviews,
  fetchMovieCast,
};

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const AUTHORIZATION_TOKEN = import.meta.env.VITE_TMDB_AUTHORIZATION_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'en-US';
const PAGE = 1;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${AUTHORIZATION_TOKEN}`
  },
};

// Helper function to make GET requests
const get = async endpoint => {
  const { data } = await axios(`${BASE_URL}${endpoint}`, options);
  return data;
};

// Fetch trending movies
const fetchTrendingMovies = async () => {
  console.log('API Fetching Trending Movies');
  const data = await get(`/trending/movie/day?language=${LANGUAGE}`);
  return data.results;
};

// Fetch movies by search query
const fetchMoviesByQuery = async searchQuery => {
  console.log('API Fetching Movies By Query');
  const data = await get(
    `/search/movie?query=${searchQuery}&language=${LANGUAGE}&page=${PAGE}`
  );
  return data.results;
};

// Fetch movie details by ID
const fetchMovieDetails = async movieId => {
  console.log('API Fetching Movie Details');
  return get(`/movie/${movieId}?language=${LANGUAGE}`);
};

// Fetch movie cast by movie ID
const fetchMovieCast = async movieId => {
  console.log('API Fetching Moview Cast');
  return get(`/movie/${movieId}/credits?language=${LANGUAGE}`);
};

// Fetch movie reviews by movie ID
const fetchMovieReviews = async movieId => {
  console.log('API Fetching Movie Reviews');
  return get(`/movie/${movieId}/reviews?language=${LANGUAGE}&page=${PAGE}`);
};
