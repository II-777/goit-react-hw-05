// External Libraries
import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../services/api';
// Components 
import Loader from '../components/Loader/Loader';
import MovieList from '../components/MovieList/MovieList';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {

      try {
        setIsLoading(true);
        const response = await fetchTrendingMovies();
        console.log('INFO Trending Movies:', response);
        setMovies(response);
      } catch (error) {
        setError(error.message);
        console.log(`${error.message}`)
      } finally {
        setIsLoading(false);
      }
    };
    getTrendingMovies();
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {!isLoading && movies.length > 0 && <MovieList movieItems={movies} />}
    </>
  );
};

export default Home;
