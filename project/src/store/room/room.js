
import { ActionType } from '../action';
import adaptToClient, {adaptDataList} from '../../utils/adaptToClient';

const initialState = {
  nearbyOffers: [],
  currentRoom: {},
  comments: [],
  error: null,
};

const room = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_CURRENT_ROOM:
      return {
        ...state,
        currentRoom: adaptToClient(action.payload),
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
    case ActionType.GET_COMMENTS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};


export { room };
