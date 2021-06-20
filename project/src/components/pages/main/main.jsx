import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import OffersList from '../../common/offers-list/offers-list';
import Map from '../../common/map/map';
import { Link } from 'react-router-dom';
import getCurrentCityOffers from '../../../getCurrentCityOffers';
import { AppRoute, CityType, sortOptions } from '../../../const';
import { offerProp } from '../../app/app.prop';
import { connect } from 'react-redux';
import { ActionCreator } from '../../../store/action';
import CitiesList from './cities-list';
import SortOptions from './sort-options';
const { FAVORITES, MAIN } = AppRoute;

function Main({ offers, city = CityType.PARIS, onCityChange }) {
  const { TOP_RATED_FIRST, PRICE_TO_HIGH, PRICE_TO_LOW, POPULAR } = sortOptions;

  const [currentSortOption, setCurrentSortOption] = useState(POPULAR);
  const currentCityData = getCurrentCityOffers(offers, city) ? getCurrentCityOffers(offers, city) : undefined;
  const [sortedOffers, setSortedOffers] = useState(currentCityData?.offers);

  const sortOffers = (sortOption) => {
    const currentCityOffers = currentCityData ? currentCityData.offers : [];

    const sortedOffersByPrice = currentCityOffers.sort((firstOffer, secondOffer) => secondOffer.price - firstOffer.price);

    switch (sortOption) {
      case PRICE_TO_LOW:
        return sortedOffersByPrice;
      case PRICE_TO_HIGH:
        return sortedOffersByPrice.reverse();
      case TOP_RATED_FIRST:
        return currentCityOffers.sort((firstOffer, secondOffer) => secondOffer.rating - firstOffer.rating);
      default:
        return currentCityOffers;
    }
  };

  useEffect(() => {
    setSortedOffers(sortOffers(currentSortOption));
  }, [currentSortOption, city]);

  const handleSortOptionClick = (option) => setCurrentSortOption(option);

  return (
    <div className="page page--gray page--main">
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList currentCity={city} onCityChange={onCityChange} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{sortedOffers.length} places to stay in {city}</b>
              <SortOptions
                onSortOptionChange={handleSortOptionClick}
                currentSortOption={currentSortOption}
              />
              <OffersList offers={sortedOffers} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {currentCityData && <Map offers={sortedOffers} cityLocation={currentCityData.location} />}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

Main.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
  city: PropTypes.oneOf(Object.values(CityType)).isRequired,
  onCityChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange(city) {
    dispatch(ActionCreator.changeCity(city));
  },
});

export { Main };
export default connect(mapStateToProps, mapDispatchToProps)(Main);
