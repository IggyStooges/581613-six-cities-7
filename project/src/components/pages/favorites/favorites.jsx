import React from 'react';
import FavoritesCity from './favorites-city/favorites-city';
import PropTypes from 'prop-types';
import favoritesCityProp from './favorites-city/favorites-city.prop';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';

const { FAVORITES, MAIN } = AppRoute;

function Favorites({ favorites }) {
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
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(favorites).map((favorite) => (
                <FavoritesCity
                  key={favorite[0]}
                  city={favorite[0]}
                  offers={favorite[1].offers}
                />
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

Favorites.propTypes = PropTypes.arrayOf(favoritesCityProp).isRequired;

export default Favorites;
