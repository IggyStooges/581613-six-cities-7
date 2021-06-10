import React, { useState } from 'react';
import RatingStars from './rating-stars';

function CommentForm() {
  const [formState, setFormState] = useState({
    rating: '0',
    comment: '',
  });

  const { rating, comment } = formState;

  const handleRatingChange = (e) => {
    setFormState({
      ...formState,
      rating: e.target.value,
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <RatingStars onChange={handleRatingChange} rating={rating} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={(e) => setFormState({
          ...formState,
          comment: e.target.value,
        })}
        value={comment}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
      </div>
    </form>

  );
}

export default CommentForm;
