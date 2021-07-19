import React from 'react';
import { offerProp, reviewProp } from '../../app/app.prop';
import PropTypes from 'prop-types';
import CommentForm from './comment-form';
import ReviewsList from './reviews/reviews-list';
import Map from '../../common/map/map';
import { AuthorizationStatus } from '../../../const';
import { connect, useDispatch } from 'react-redux';
import { authorizationStatusProp } from '../../app/app.prop';
import { getAuthorizationStatus } from '../../../store/user/selectors';
import { markFavorite } from '../../../store/api-actions';

function RoomProperty({
  currentRoom,
  reviews,
  nearbyOffers,
  authorizationStatus,
}) {
  const {
    id,
    images,
    title,
    description,
    isPremium,
    apartmentType,
    rating,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    city,
    isFavorite,
  } = currentRoom;
  const name = host?.name;
  const isPro = host?.isPro;
  const avatarUrl = host?.avatarUrl;

  const dispatch = useDispatch();

  const handleFavoriteClick = () => {
    dispatch(
      markFavorite({
        id: id,
        status: isFavorite ? 0 : 1,
      }),
    );
  };

  return (
    <section className="property">
      <div className="property__gallery-container container">
        <div className="property__gallery">
          {images &&
            images.map((image) => (
              <div className="property__image-wrapper" key={image}>
                <img
                  className="property__image"
                  src={image}
                  alt="Photo studio"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="property__container container">
        <div className="property__wrapper">
          {isPremium && (
            <div className="property__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="property__name-wrapper">
            <h1 className="property__name">{title}</h1>
            <button
              className={`property__bookmark-button button ${
                isFavorite ? 'property__bookmark-button--active' : ''
              }`}
              type="button"
              onClick={handleFavoriteClick}
            >
              <svg className="property__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="property__rating rating">
            <div className="property__stars rating__stars">
              <span style={{ width: `${(rating / 5) * 100}%` }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            {rating && (
              <span className="property__rating-value rating__value">
                {rating}
              </span>
            )}
          </div>
          <ul className="property__features">
            {apartmentType && (
              <li className="property__feature property__feature--entire">
                {apartmentType}
              </li>
            )}
            {bedrooms && (
              <li className="property__feature property__feature--bedrooms">
                {bedrooms} Bedrooms
              </li>
            )}
            {maxAdults && (
              <li className="property__feature property__feature--adults">
                Max {maxAdults} adults
              </li>
            )}
          </ul>
          {price && (
            <div className="property__price">
              <b className="property__price-value">&euro;{price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
          )}
          <div className="property__inside">
            <h2 className="property__inside-title">What&apos;s inside</h2>
            <ul className="property__inside-list">
              {goods &&
                goods.map((good) => (
                  <li className="property__inside-item" key={good}>
                    {good}
                  </li>
                ))}
            </ul>
          </div>
          <div className="property__host">
            <h2 className="property__host-title">Meet the host</h2>
            <div className="property__host-user user">
              {avatarUrl && (
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img
                    className="property__avatar user__avatar"
                    src={avatarUrl}
                    width="74"
                    height="74"
                    alt="Host avatar"
                  />
                </div>
              )}
              {name && <span className="property__user-name">{name}</span>}
              {isPro && <span className="property__user-status">Pro</span>}
            </div>
            {description && (
              <div className="property__description">
                {description.split('.').map((sentence) => (
                  <p className="property__text" key={sentence}>
                    {sentence}
                  </p>
                ))}
              </div>
            )}
          </div>
          <section className="property__reviews reviews">
            <h2 className="reviews__title">
              Reviews &middot; <span className="reviews__amount">1</span>
            </h2>
            <ReviewsList reviews={reviews} />
            {authorizationStatus === AuthorizationStatus.AUTH && (
              <CommentForm roomId={id} />
            )}
          </section>
        </div>
      </div>
      <section className="property__map map">
        {nearbyOffers && (
          <Map offers={nearbyOffers} cityLocation={city?.location} />
        )}
      </section>
    </section>
  );
}

RoomProperty.propTypes = {
  currentRoom: offerProp,
  reviews: PropTypes.arrayOf(reviewProp),
  nearbyOffers: PropTypes.arrayOf(offerProp).isRequired,
  authorizationStatus: authorizationStatusProp,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export { RoomProperty };
export default connect(mapStateToProps, null)(RoomProperty);
