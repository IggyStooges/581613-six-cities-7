import React from 'react';
import PropTypes from 'prop-types';
import { CityType } from '../../../const';

function CitiesList({ currentCity, onCityChange }) {
  const cities = Object.values(CityType);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            cities.map((city) => (
              <li className="locations__item" key={city} >
                <a
                  className={`locations__item-link tabs__item ${city === currentCity && 'tabs__item--active'}`}
                  href="#"
                  onClick={() => { onCityChange(city); }}
                >
                  <span>{city}</span>
                </a>
              </li>
            ))
          }
        </ul>
      </section>
    </div>

  );
}

CitiesList.propTypes = {
  currentCity: PropTypes.oneOf(Object.values(CityType)).isRequired,
  onCityChange: PropTypes.func.isRequired,
};

export default CitiesList;
