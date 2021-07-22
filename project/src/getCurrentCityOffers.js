import sortByCity from './utils/sortByCity';

const getCurrentCityOffers = (offers, currentCity) =>  sortByCity(offers)[currentCity];

export default getCurrentCityOffers;
