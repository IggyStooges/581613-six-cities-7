import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import { offerProp } from '../../app/app.prop';
import { OffersListType, OffersListClassNames } from '../../../const';

function OffersList({ offers, type = OffersListType.MAIN}) {
  // пока активная карточка не используется, но требуется добавить в стейт по заданию, для дальнейшего использования
  // eslint-disable-next-line no-unused-vars
  const [activeCardId, setActiveCardId] = useState('');

  const currentClassName = type === OffersListType.NEARBY ? OffersListClassNames.NEARBY : OffersListClassNames.MAIN;

  return (
    <div className={`places__list tabs__content ${currentClassName}`}>
      {offers.map(({ price, previewImage, title, type: offerType, rating, id }) => (
        <PlaceCard
          key={id}
          rating={rating}
          apartmentType={offerType}
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
  type: PropTypes.oneOf(Object.values(OffersListType)),
};

export default OffersList;
