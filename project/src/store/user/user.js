
import { ActionType } from '../action';
import { AuthorizationStatus } from '../../const';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: {
    login: '',
    avatarUrl: '',
  },
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
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
