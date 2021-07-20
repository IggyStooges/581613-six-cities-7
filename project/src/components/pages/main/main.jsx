import React, { useState } from 'react';
import PropTypes from 'prop-types';
import OffersList from '../../common/offers-list/offers-list';
import Map from '../../common/map/map';
import getCurrentCityOffers from '../../../getCurrentCityOffers';
import { CityType, sortOptions } from '../../../const';
import { offerProp } from '../../app/app.prop';
import { connect } from 'react-redux';
import { changeCity } from '../../../store/action';
import CitiesList from './cities-list';
import Header from '../../common/header/header';
import MainEmpty from './main-empty';
import SortOptions from './sort-options';
import { getCurrentCity } from '../../../store/offers/selectors';

function Main({ offers, city = CityType.PARIS, onCityChange }) {
  const { TOP_RATED_FIRST, PRICE_TO_HIGH, PRICE_TO_LOW, POPULAR } = sortOptions;

  const [currentSortOption, setCurrentSortOption] = useState(POPULAR);
  const currentCityData = getCurrentCityOffers(offers, city)
    ? getCurrentCityOffers(offers, city)
    : undefined;

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

  const sortedOffers = sortOffers(currentSortOption);

  const handleSortOptionClick = (option) => setCurrentSortOption(option);

  return (
    <div className='page page--gray page--main'>
      <Header />
      <main className='page__main page__main--index'>
        <h1 className='visually-hidden'>Cities</h1>
        <CitiesList currentCity={city} onCityChange={onCityChange} />
        <div className='cities'>
          {sortedOffers.length ? (
            <div className='cities__places-container container'>
              <section className='cities__places places'>
                <h2 className='visually-hidden'>Places</h2>
                <b className='places__found'>
                  {sortedOffers.length} places to stay in {city}
                </b>
                <SortOptions
                  onSortOptionChange={handleSortOptionClick}
                  currentSortOption={currentSortOption}
                />
                <OffersList offers={sortedOffers} hasCardHoverEffect />
              </section>
              <div className='cities__right-section'>
                <section className='cities__map map'>
                  {currentCityData && (
                    <Map
                      offers={sortedOffers}
                      cityLocation={currentCityData.location}
                    />
                  )}
                </section>
              </div>
            </div>
          ) : <MainEmpty city={city} />}
        </div>
      </main>
    </div>
  );
}

Main.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
  city: PropTypes.oneOf(Object.values(CityType)),
  onCityChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: getCurrentCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange(city) {
    dispatch(changeCity(city));
  },
});

export { Main };
export default connect(mapStateToProps, mapDispatchToProps)(Main);
