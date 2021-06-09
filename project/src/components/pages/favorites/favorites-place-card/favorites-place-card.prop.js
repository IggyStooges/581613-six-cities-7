import PropTypes from 'prop-types';
import { ApartmentType } from '../../../../const';

export default PropTypes.shape({
  price: PropTypes.number.isRequired,
  previewImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  apartmentType: PropTypes.oneOf(Object.values(ApartmentType)).isRequired,
  rating: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
}).isRequired;
