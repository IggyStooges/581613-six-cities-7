import PropTypes from 'prop-types';
import placeCardProp from '../favorites-place-card/favorites-place-card.prop';
import { CityType } from '../../../../const';

export default PropTypes.shape({
  city: PropTypes.oneOf(Object.values(CityType)).isRequired,
  offers: PropTypes.arrayOf(placeCardProp).isRequired
}).isRequired;
