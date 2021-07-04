import { ActionCreator } from './action';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';

export const fetchOffers = () => (dispatch, _getState, api) => (
  api.get(APIRoute.OFFERS)
    .then(({ data }) => dispatch(ActionCreator.getOffers(data)))
);

export const fetchCurrentRoom = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.OFFERS}/${id}`)
    .then(
      ({ data }) => dispatch(ActionCreator.getCurrentRoom(data)),
      () => dispatch(ActionCreator.redirectToRoute(AppRoute.NOT_FOUND)))
    .then(() => {
      api.get(`${APIRoute.OFFERS}/${id}/nearby`)
        .then(({ data }) => dispatch(ActionCreator.getNearbyOffers(data)))
        .then(() => {
          api.get(`${APIRoute.COMMENTS}/${id}`)
            .then(({ data }) => dispatch(ActionCreator.getComments(data)));
        });
    })
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => { })
);

export const login = ({ login: email, password }) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, { email, password })
    .then(({ data }) => {
      localStorage.setItem('token', data.token);
      dispatch(ActionCreator.getUserInfo({ login: data.email, avatarUrl: data.avatar_url }));
    })
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(ActionCreator.redirectToRoute(AppRoute.MAIN)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(APIRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(ActionCreator.logout()))
);

export const postComment = ({ comment, rating, id }) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.COMMENTS}/${id}`, { comment, rating })
    .then(() => {
      api.get(`${APIRoute.COMMENTS}/${id}`)
        .then(({ data }) => dispatch(ActionCreator.getComments(data)));
    })
);
