// External Libraries
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
// API
import { fetchMovieReviews } from "../../services/api";
// Styles
import css from "./MovieReviews.module.css";

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await fetchMovieReviews(movieId);
        console.log('INFO fetchMovieReviews:', response);
        setReviews(response.results);
      } catch (error) {
        console.log(`${error.message}`)
        toast.error("Oops. Failed to retrieve reviews.");
      }
    };
    getReviews();
  }, []);

  return (
    <div>
      <h3 className={css.title}>Movie Reviews</h3>
      {(reviews !== null && reviews.length) === 0 && (<p>No reviews available.</p>)}
      <ul className={css.list}>
        {reviews !== null &&
          reviews.map((review) => {
            return (
              <li key={review.id}>
                <h4 className={css.descr}>User: {review.author}</h4>
                <p>{review.content}</p>
              </li>
            );
          })}
      </ul>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Reviews;