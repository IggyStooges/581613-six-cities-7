import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import { offerProp } from '../../app/app.prop';

function OffersList({ offers, className }) {
  // пока активная карточка не используется, но требуется добавить в стейт по заданию, для дальнейшего использования
  // eslint-disable-next-line no-unused-vars
  const [activeCardId, setActiveCardId] = useState('');

  return (
    <div className={`places__list tabs__content ${className}`}>
      {offers.map(({ price, previewImage, title, type, rating, id }) => (
        <PlaceCard
          key={id}
          rating={rating}
          apartmentType={type}
          title={title}
          previewImage={previewImage}
          price={price}
          onMouseOver={() => setActiveCardId(id)}
          id={id}
        />
      ))}
    </div>
  );
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
  className: PropTypes.string.isRequired
};

export default OffersList;
