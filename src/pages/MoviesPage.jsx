// External Libraries
import { useEffect, useState } from 'react';
// Components 
import Loader from '../components/Loader/Loader';
import MovieList from '../components/MovieList/MovieList';
import SearchBox from '../components/SearchBox/SearchBox';
import toast, { Toaster } from 'react-hot-toast';
// API
import { fetchMoviesByQuery } from '../services/api';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    const getMovieInfo = async () => {
      try {
        setIsLoading(true);
        const response = await fetchMoviesByQuery(query);
        console.log('INFO Movies By Query:', response);
        if (response.length === 0) {
          toast.error('Nothing found.');
          setError('Nothing found.');
          return;
        }
        setMovies(response);
      } catch (error) {
        toast.error('Oops. Failed to retrieve movies.')
        console.log(`${error.message}`)
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieInfo();
  }, [query]);

  const onQueryChange = searchQuery => {
    if (searchQuery === query) {
      return;
    }
    setQuery(searchQuery);
  };

  return (
    <>
      <SearchBox onQueryChange={onQueryChange} />
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {!isLoading && movies.length > 0 && <MovieList movieItems={movies} />}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Movies;
