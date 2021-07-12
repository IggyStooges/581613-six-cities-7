import browserHistory from '../../browser-history';
import {ActionType} from '../action';
import {AppRoute, AuthorizationStatus} from '../../const';

export const redirect = (_store) => (next) => (action) => {
  if (action.type === ActionType.REDIRECT_TO_ROUTE) {
    browserHistory.push(action.payload);
  }

  return next(action);
};

export const redirectToLogin = (_store) => (next) => (action) => {
  const authorizationStatus = _store.getState().USER.authorizationStatus;
  const isPrivateAction = action.type === ActionType.GET_FAVORITES_OFFERS || action.type === ActionType.MARK_FAVORITE_OFFER;

  if (isPrivateAction && authorizationStatus === AuthorizationStatus.NO_AUTH) {
    browserHistory.push(AppRoute.SIGN_IN);
  }

  return next(action);
};
