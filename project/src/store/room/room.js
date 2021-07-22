
import { ActionType } from '../action';
import adaptToClient, {adaptDataList} from '../../utils/adaptToClient';

const initialState = {
  nearbyOffers: [],
  currentRoom: null,
  comments: [],
  error: null,
  isRoomDataLoaded: false,
};

const room = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_CURRENT_ROOM:
      return {
        ...state,
        currentRoom: adaptToClient(action.payload),
        isRoomDataLoaded: true,
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
