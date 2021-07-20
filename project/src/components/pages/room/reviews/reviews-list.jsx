import React from 'react';
import PropTypes from 'prop-types';
import {reviewProp} from '../../../app/app.prop';
import Review from './review';

function ReviewsList({ reviews }) {
  const sortReviews = () => reviews.sort((firstReview, secondReview) => {
    const firstReviewDate = new Date(firstReview.date);
    const secondReviewDate = new Date(secondReview.date);

    return secondReviewDate.getTime() - firstReviewDate.getTime();
  }).slice(0, 10);

  return (
    <ul className="reviews__list">
      {sortReviews().map((review) => <Review review={review} key={review.id}/>)}
    </ul>
  );
}

ReviewsList.propTypes = PropTypes.arrayOf(reviewProp).isRequired;

export default ReviewsList;
