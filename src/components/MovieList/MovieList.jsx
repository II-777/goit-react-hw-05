// External Libraries
import { Link, useLocation } from 'react-router-dom';
// Styles 
import css from './MovieList.module.css';

const MovieList = ({ movieItems }) => {
  const location = useLocation();

  const chooseURL = (id) => {
    return location.pathname === '/movies' ? `${id}` : `/movies/${id}`;
  };

  return (
    <div className={css.container}>
      {movieItems.map(({ poster_path, id, title }) => (
        <div className={css.cardWrapper} key={id}>
          <Link to={chooseURL(id)} state={{ from: location }}>
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500${poster_path}`
                  : `https://placehold.co/200x300?text=No+image`
              }
              alt={title}
            />
            <div className={css.movieName}>{title}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MovieList;