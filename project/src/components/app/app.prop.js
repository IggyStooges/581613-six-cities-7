import { number, string, bool, shape, arrayOf, oneOf } from 'prop-types';
import { ApartmentType, CityType, AuthorizationStatus } from '../../const';

export const offerProp = shape({
  bedrooms: number,
  city: shape({
    location: shape({
      latitude: number,
      longitude: number,
      zoom: number,
    }),
    name: oneOf(Object.values(CityType)),
  }),
  description: string,
  goods: arrayOf(string),
  host: shape({
    avatarUrl: string,
    id: number,
    isPro: bool,
    name: string,
  }),
  id: number,
  images: arrayOf(string),
  isFavorite: bool,
  isPremium: bool,
  location: shape({
    latitude: number,
    longitude: number,
    zoom: number,
  }),
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: oneOf(Object.values(ApartmentType)),
});

export const reviewProp = shape({
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: shape({
    avatarUrl: string,
    id: number,
    isPro: bool,
    name: string,
  }),
});

export const authorizationStatusProp = oneOf(Object.values(AuthorizationStatus));
