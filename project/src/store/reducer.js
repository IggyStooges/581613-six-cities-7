
import { ActionType } from './action';
import { nearbyOffers } from '../mocks/offers';
import adaptToClient from '../utils/adaptToClient';
import { CityType, AuthorizationStatus } from '../const';

const adaptOffersList = (offersList) => offersList.map((offer) => adaptToClient(offer));
const initialState = {
  city: CityType.PARIS,
  offers: [],
  nearbyOffers: adaptOffersList(nearbyOffers),
  hoverCardIndex: null,
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  login: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case ActionType.HOVER_CITY_CARD:
      return {
        ...state,
        hoverCardIndex: action.payload,
      };
    case ActionType.GET_OFFERS:
      return {
        ...state,
        offers: adaptOffersList(action.payload),
        isDataLoaded: true,
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.LOGIN:
      return {
        ...state,
        login: action.payload,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      };
    default:
      return state;
  }
};


export { reducer };
