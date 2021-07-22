import React, { useState } from 'react';
import RatingStars from './rating-stars';
import { useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { postComment } from '../../../store/api-actions';
import {getCommentsError} from '../../../store/room/selectors';

function CommentForm({ roomId, commentError }) {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    rating: 0,
    comment: '',
    isFormDisabled: false,
  });

  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const { rating, comment } = formState;

  const handleRatingChange = (e) => {
    setFormState({
      ...formState,
      rating: Number(e.target.value),
    });
  };

  const handleCommentChange = (e) => {
    setFormState({
      ...formState,
      comment: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsFormDisabled(true);

    dispatch(postComment({
      id: roomId,
      comment: comment,
      rating: rating,
    }));

    setFormState({
      rating: 0,
      comment: '',
    });

    setIsFormDisabled(false);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      {!!commentError && (
        <h2>Что-то пошло не так, попробуйте повторить отправку позже.</h2>
      )}
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <RatingStars onChange={handleRatingChange} rating={rating} isDisabled={isFormDisabled} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleCommentChange}
        value={comment}
        disabled={isFormDisabled}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help" data-testid="reviews-help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={comment.length < 50 || !rating || isFormDisabled}>Submit</button>
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  roomId: PropTypes.number,
  commentError: PropTypes.string,
};

const mapStateToProps = (state) => ({
  commentError: getCommentsError(state),
});


export { CommentForm };
export default connect(mapStateToProps, null)(CommentForm);
