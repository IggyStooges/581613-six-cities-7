
import { ActionType } from './action';
import { offers, nearbyOffers } from '../mocks/offers';
import adaptToClient from '../utils/adaptToClient';
import { CityType } from '../const';

const adaptOffers = offers.map((offer) => adaptToClient(offer));
const adaptNearbyOffers = nearbyOffers.map((offer) => adaptToClient(offer));

const initialState = {
  city: CityType.PARIS,
  offers: adaptOffers,
  nearbyOffers: adaptNearbyOffers,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
      };
    default:
      return state;
  }
};


export { reducer };
