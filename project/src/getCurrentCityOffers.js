import sortbyCity from './utils/sortByCity';

const getCurrentCityOffers = (offers, currentCity) =>  sortbyCity(offers)[currentCity];

export default getCurrentCityOffers;
