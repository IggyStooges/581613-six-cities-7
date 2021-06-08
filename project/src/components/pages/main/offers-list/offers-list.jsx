import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import offerProp from '../../../app/app.prop';

function OffersList({ offers }) {
  const [activeCardId, setActiveCardId] = useState('');

  return (
    <>
      {offers.map(({ price, previewImage, title, type, rating, id }) => (
          <PlaceCard
            key={id}
            rating={rating}
            apartmentType={type}
            title={title}
            previewImage={previewImage}
            price={price}
            onMouseOver={() => {setActiveCardId(id)}}
          />
      ))}
    </>
  );
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
};

export default OffersList;
