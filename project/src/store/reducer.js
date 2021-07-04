
import { ActionType } from './action';
import adaptToClient from '../utils/adaptToClient';
import { CityType, AuthorizationStatus } from '../const';

const adaptDataList = (offersList) => offersList.map((offer) => adaptToClient(offer));
const initialState = {
  city: CityType.PARIS,
  offers: [],
  nearbyOffers: [],
  currentRoom: {},
  comments: [],
  hoverCardIndex: null,
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: {
    login: '',
    avatarUrl: '',
  },
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
        offers: adaptDataList(action.payload),
        isDataLoaded: true,
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.GET_CURRENT_ROOM:
      return {
        ...state,
        currentRoom: adaptToClient(action.payload),
        isDataLoaded: true,
      };
    case ActionType.GET_NEARBY_OFFERS:
      return {
        ...state,
        nearbyOffers: adaptDataList(action.payload),
      };
    case ActionType.GET_COMMENTS:
      return {
        ...state,
        comments: adaptDataList(action.payload),
      };
    case ActionType.USER:
      return {
        ...state,
        user: action.payload,
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
