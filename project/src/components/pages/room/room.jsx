import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, OffersListType } from '../../../const';
import PropTypes from 'prop-types';
import {offerProp, reviewProp} from '../../app/app.prop';
import OffersList from '../../common/offers-list/offers-list';
import { useParams } from 'react-router-dom';
import RoomProperty from './room-property';

const { FAVORITES, MAIN } = AppRoute;

function Room({ offers, reviews, nearbyOffers }) {
  const { id } = useParams();

  const currentRoom = offers.find((offer) => offer.id === id) || nearbyOffers.find((offer) => offer.id === id);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={MAIN}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={FAVORITES}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <RoomProperty
          currentRoom={currentRoom}
          reviews={reviews}
          nearbyOffers={nearbyOffers}
        />
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={nearbyOffers} type={OffersListType.NEARBY} />
          </section>
        </div>
      </main>
    </div>
  );
}

Room.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
  reviews: PropTypes.arrayOf(reviewProp).isRequired,
  nearbyOffers: PropTypes.arrayOf(offerProp).isRequired,
};

export default Room;
