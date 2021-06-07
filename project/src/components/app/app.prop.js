import { number, string, bool, shape, arrayOf, oneOf, objectOf } from 'prop-types';
import { ApartmentType, CityType } from '../../const';

export default shape({
  bedrooms: number.isRequired,
  city: shape({
    location: shape({
      latitude: number.isRequired,
      longitude: number.isRequired,
      zoom: number.isRequired,
    }).isRequired,
    name: oneOf(Object.values(CityType)).isRequired,
  }).isRequired,
  description: string.isRequired,
  goods: objectOf(string).isRequired,
  host: shape({
    avatarUrl: string.isRequired,
    id: string.isRequired,
    isPro: bool.isRequired,
    name: string.isRequired,
  }).isRequired,
  id: string.isRequired,
  images: objectOf(string).isRequired,
  isFavorite: bool.isRequired,
  isPremium: bool.isRequired,
  location: shape({
    latitude: number.isRequired,
    longitude: number.isRequired,
    zoom: number.isRequired,
  }).isRequired,
  maxAdults: number.isRequired,
  previewImage: string.isRequired,
  price: number.isRequired,
  rating: number.isRequired,
  title: string.isRequired,
  type: oneOf(Object.values(ApartmentType)).isRequired,
}).isRequired;
