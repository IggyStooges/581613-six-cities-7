import React from 'react';
import PropTypes from 'prop-types';
import {reviewProp} from '../../../app/app.prop';
import Review from './review';

function ReviewsList({ reviews }) {

  return (
    <ul className="reviews__list">
      {reviews.map((review) => <Review review={review} key={review.id}/>)}
    </ul>
  );
}

ReviewsList.propTypes = PropTypes.arrayOf(reviewProp).isRequired;

export default ReviewsList;
