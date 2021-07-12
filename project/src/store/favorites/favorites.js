import { ActionType } from '../action';
import {adaptDataList} from '../../utils/adaptToClient';
import groupOffersByCity from '../../utils/sortByCity';

const initialState = {
  favoritesList: [],
};

const favorites = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_FAVORITES_OFFERS:
      return {
        ...state,
        favoritesList: groupOffersByCity(adaptDataList(action.payload)),
      };
    default:
      return state;
  }
};

export { favorites };
