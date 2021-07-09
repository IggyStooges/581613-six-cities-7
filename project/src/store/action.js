export const ActionType = {
  HOVER_CITY_CARD: 'hoverCityCard',
  CHANGE_CITY: 'changeCity',
  GET_OFFERS: 'getOffers',
  GET_CURRENT_ROOM: 'getCurrentRoom',
  GET_NEARBY_OFFERS: 'getNearbyOffers',
  GET_COMMENTS: 'getComments',
  REQUIRED_AUTHORIZATION: 'requiredAuthorization',
  LOGOUT: 'logout',
  USER: 'getUserInfo',
  REDIRECT_TO_ROUTE: 'redirectToRoute',
};

export const changeCity = (city) => ({
  type: ActionType.CHANGE_CITY,
  payload: city,
});

export const getOffers = (offers) => ({
  type: ActionType.GET_OFFERS,
  payload: offers,
});

export const hoverCityCard = (hoverCardIndex) => ({
  type: ActionType.HOVER_CITY_CARD,
  payload: hoverCardIndex,
});

export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status,
});

export const getUserInfo = (user) => ({
  type: ActionType.USER,
  payload: user,
});

export const getCurrentRoom = (room) => ({
  type: ActionType.GET_CURRENT_ROOM,
  payload: room,
});

export const getNearbyOffers = (offers) => ({
  type: ActionType.GET_NEARBY_OFFERS,
  payload: offers,
});

export const getComments = (comments) => ({
  type: ActionType.GET_COMMENTS,
  payload: comments,
});

export const logout = () => ({
  type: ActionType.LOGOUT,
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url,
});
