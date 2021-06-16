import React from 'react';
import moment from 'moment';
import {reviewProp} from '../../../app/app.prop';

function Review({ review }) {
  const { comment, rating, date, user } = review;
  const { avatarUrl, name } = user;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${(rating / 5) * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">{moment(date).format("MMMM YYYY")}</time>
      </div>
    </li>
  );
}

Review.propTypes = reviewProp;

export default Review;
