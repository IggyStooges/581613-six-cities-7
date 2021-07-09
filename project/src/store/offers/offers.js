
import { ActionType } from '../action';
import {adaptDataList} from '../../utils/adaptToClient';
import { CityType } from '../../const';

const initialState = {
  city: CityType.PARIS,
  offers: [],
  hoverCardIndex: null,
  isDataLoaded: false,
};

const offers = (state = initialState, action) => {
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
    default:
      return state;
  }
};


export { offers };
