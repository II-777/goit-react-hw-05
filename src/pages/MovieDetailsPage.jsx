// External Libraries 
import { Suspense, useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useParams } from 'react-router-dom';
import { GiClapperboard } from "react-icons/gi";
import { IoChatboxEllipses } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';
// Components 
import Loader from '../components/Loader/Loader';
import BackLink from '../components/BackLink/BackLink';
// API
import { fetchMovieDetails } from '../services/api';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const backLinkHref = location?.state?.from ?? '/';

  useEffect(() => {
    const getMovieInfo = async () => {
      try {
        setIsLoading(true);
        const response = await fetchMovieDetails(movieId);
        console.log('INFO Movie Details:', response);
        setMovieInfo(response);
      } catch (error) {
        toast.erorr('Oops. Failed to fetch movie information.');
        console.log(`${error.message}`)
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieInfo();
  }, [movieId]);

  const {
    title,
    release_date,
    overview,
    genres,
    poster_path,
    original_title,
    vote_average,
  } = movieInfo || {};

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}

      {!isLoading && movieInfo && (
        <>
          <BackLink to={backLinkHref}>
            Return
          </BackLink>

          <div style={{ display: 'flex', marginTop: '20px' }}>
            <img
              width="300px"
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500${poster_path}`
                  : `https://placehold.co/300x450?text=No+image`
              }
              alt={original_title}
              style={{ borderRadius: '8px', marginRight: '20px' }}
            />
            <div>
              <h1>
                {title} ({release_date.slice(0, 4)})
              </h1>
              <p>User score: {Math.floor(vote_average * 10)}%</p>
              <h2>Overview</h2>
              <p>{overview}</p>
              <h2>Genres</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {genres?.map(genre => (
                  <li
                    key={genre.id}
                    style={{
                      display: 'inline',
                      marginRight: '10px',
                      backgroundColor: 'grey',
                      padding: '8px',
                      borderRadius: '4px'
                    }}
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <h3>Additional information:</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <Link
                to="cast"
                state={{ ...location.state }}
                style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }}
              >
                <span className="link-text">
                  <GiClapperboard size='32px' />
                  Cast
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="reviews"
                state={{ ...location.state }}
                style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }}
              >
                <span className="link-text">
                  <IoChatboxEllipses size='32px' />
                  Reviews
                </span>
              </Link>
            </li>
          </ul>
          <Toaster position="top-right" reverseOrder={false} />
          <style>
            {`
              .link-text {
                transition: color 250ms cubic-bezier(0.65, 0.05, 0.35, 1);
              }

              a:hover .link-text {
                color: orangered;
              }
            `}
          </style>
        </>
      )}

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
