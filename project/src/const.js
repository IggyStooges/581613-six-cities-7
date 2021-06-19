export const ApartmentType = {
  APARTMENT: 'apartment',
  ROOM: 'private room',
  HOUSE: 'house',
  HOTEL: 'hotel',
};

export const OffersListType = {
  NEARBY: 'nearby',
  MAIN: 'main',
};

export const OffersListClassNames = {
  NEARBY: 'near-places__list',
  MAIN: 'cities__places-list',
};

export const CityType = {
  PARIS: 'Paris',
  COLOGNE: 'Cologne',
  BRUSSELS: 'Brussels',
  AMSTERDAM: 'Amsterdam',
  HAMBURG: 'Hamburg',
  DUSSELDORF: 'Dusseldorf',
};

export const AppRoute = {
  MAIN: '/',
  SIGN_IN: '/login',
  FAVORITES: '/favorites',
  ROOM: '/offer/:id',
};

export const CITY = [52.38333, 4.9];

export const ICON = {
  iconUrl: 'img/pin.svg',
  activeIconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
};

export const ZOOM = 12;

export const sortOptions = {
  POPULAR: 'Popular',
  PRICE_TO_HIGH: 'Price: low to high',
  PRICE_TO_LOW: 'Price: high to low',
  TOP_RATED_FIRST: 'Top rated first',
};
