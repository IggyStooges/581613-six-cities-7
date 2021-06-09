import React, { useState } from 'react';

const RATING_MARKS = [5, 4, 3, 2, 1];

function CommentForm() {
  const [formState, setFormState] = useState({
    rating: '0',
    comment: '',
  });

  const { rating, comment } = formState;

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_MARKS.map((mark) => (
          <React.Fragment key={mark}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={`${mark}`}
              id={`${mark}-stars`}
              type="radio"
              checked={rating === `${mark}`}
              onChange={(e) => setFormState({
                ...formState,
                rating: e.target.value,
              })}
            />
            <label htmlFor={`${mark}-stars`} className="reviews__rating-label form__rating-label" title="good">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
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
