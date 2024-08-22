// External Libraries
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
// Pages
import NotFoundPage from '../pages/NotFoundPage';
const HomePage = lazy(() => import('../pages/HomePage'));
const MovieDetailsPage = lazy(() => import('../pages/MovieDetailsPage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage'));
// Components
import Navigation from './Navigation/Navigation';
import Loader from './Loader/Loader';
const MovieReviews = lazy(() => import('./MovieReviews/MovieReviews'));
const MovieCast = lazy(() => import('./MovieCast/MovieCast'));
// Styles
import css from './App.module.css';

const App = () => {
  return (
    <div className={css.container}>
      {/* Header Navigation Component */}
      <Navigation />

      {/* Routing */}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
