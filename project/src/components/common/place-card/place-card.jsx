import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { hoverCityCard } from '../../../store/action';
import { connect, useDispatch } from 'react-redux';
import { markFavorite } from '../../../store/api-actions';

function PlaceCard({ price, previewImage, title, apartmentType, rating, id, isFavorite, hasHoverEffect, onCardHover }) {
  const dispatch = useDispatch();
  const getOfferPath = (roomId) => `/offer/${roomId}`;

  const handleFavoriteClick = () => {
    dispatch(markFavorite({
      id: id,
      status: isFavorite ? 0 : 1,
    }));
  };

  const handleMouseOver = () => {
    if (!hasHoverEffect) {
      return;
    }

    onCardHover(id);
  };

  const handleMouseLeave = () => {
    if (!hasHoverEffect) {
      return;
    }

    onCardHover(null);
  };

  return (
    <article
      className="cities__place-card place-card"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={getOfferPath(id)}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title} />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={handleFavoriteClick}
            className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(rating / 5) * 100}%` }}></span>
            <span className="visually-hidden">{rating}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={getOfferPath(id)}>{title}</Link>
        </h2>
        <p className="place-card__type">{apartmentType}</p>
      </div>
    </article>
  );
}

PlaceCard.propTypes = {
  price: PropTypes.number.isRequired,
  previewImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  apartmentType: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  onCardHover: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  isFavorite: PropTypes.bool,
  hasHoverEffect: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onCardHover(index) {
    dispatch(hoverCityCard(index));
  },
});

export { PlaceCard };
export default connect(null, mapDispatchToProps)(PlaceCard);
