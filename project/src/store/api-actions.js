import { getComments, getOffers, getCurrentRoom, requireAuthorization, getUserInfo, redirectToRoute, getNearbyOffers } from './action';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';

export const fetchOffers = () => (dispatch, _getState, api) => (
  api.get(APIRoute.OFFERS)
    .then(({ data }) => dispatch(getOffers(data)))
);

export const fetchCurrentRoom = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.OFFERS}/${id}`)
    .then(
      ({ data }) => dispatch(getCurrentRoom(data)),
      () => dispatch(redirectToRoute(AppRoute.NOT_FOUND)))
    .then(() => {
      api.get(`${APIRoute.OFFERS}/${id}/nearby`)
        .then(({ data }) => dispatch(getNearbyOffers(data)))
        .then(() => {
          api.get(`${APIRoute.COMMENTS}/${id}`)
            .then(({ data }) => dispatch(getComments(data)));
        });
    })
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(({ data }) => {
      localStorage.setItem('token', data.token);
      dispatch(getUserInfo({ login: data.email, avatarUrl: data.avatar_url }));
    })
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => { })
);

export const login = ({ login: email, password }) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, { email, password })
    .then(({ data }) => {
      localStorage.setItem('token', data.token);
      dispatch(getUserInfo({ login: data.email, avatarUrl: data.avatar_url }));
    })
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.MAIN)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(APIRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(logout()))
);

export const postComment = ({ comment, rating, id }) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.COMMENTS}/${id}`, { comment, rating }, {
    headers: {
      'x-token': localStorage.getItem('token'),
    },
  })
    .then(() => {
      api.get(`${APIRoute.COMMENTS}/${id}`, {
        headers: {
          'x-token': localStorage.getItem('token'),
        },
      })
        .then(({ data }) => dispatch(getComments(data)));
    })
);
