import React from 'react';
import PlaceCard from '../favorites-place-card/favorites-place-card';
import favoritesCityProp from './favorites-city.prop';

function FavoritesCity({ city, offers }) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map(({ price, previewImage, title, type, rating, id }) => (
          <PlaceCard
            key={id}
            rating={rating}
            apartmentType={type}
            title={title}
            previewImage={previewImage}
            price={price}
            id={id}
          />
        ))}
      </div>
    </li>
  );
}

FavoritesCity.propTypes = favoritesCityProp;

export default FavoritesCity;
