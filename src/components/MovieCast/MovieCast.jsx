// External Libraries
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
// Components
import Loader from '../Loader/Loader';
// API
import { fetchMovieCast } from '../../services/api';
// Styles
import css from "./MovieCast.module.css";

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCastInfo = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchMovieCast(movieId);
        console.log('INFO fetchMovieCast:', response);
        setCast(response.cast);
      } catch (error) {
        toast.error('Failed to retrieve cast data.');
        console.log(`${error.message}`)
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getCastInfo();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}

      <h3 className={css.title}>Movie Cast</h3>
      {cast.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap' }}>
          {cast.map(({ id, profile_path, original_name, name, character }) => (
            <li key={id} style={{ margin: '10px', textAlign: 'center' }}>
              <img
                width="200px"
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500${profile_path}`
                    : `https://placehold.co/200x300?text=No+image`
                }
                alt={original_name || 'No image available'}
                style={{ borderRadius: '4px' }}
              />
              <div style={{ marginTop: '10px', width: '200px' }}>
                <strong>{name}</strong>
                <p>Role: {character}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p>No cast information available.</p>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Cast;