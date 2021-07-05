import React from 'react';
import PropTypes from 'prop-types';

const RATING_MARKS = [5, 4, 3, 2, 1];

function RatingStars({ onChange, rating }) {

  return (
    <div className="reviews__rating-form form__rating">
      {RATING_MARKS.map((mark) => (
        <React.Fragment key={mark}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value={`${mark}`}
            id={`${mark}-stars`}
            type="radio"
            checked={rating === mark}
            onChange={onChange}
          />
          <label htmlFor={`${mark}-stars`} className="reviews__rating-label form__rating-label" title="good">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </React.Fragment>
      ))}
    </div>
  );
}

RatingStars.propTypes = {
  onChange: PropTypes.func.isRequired,
  rating: PropTypes.number,
};


export default RatingStars;
