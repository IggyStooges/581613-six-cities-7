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

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
  getOffers: (offers) => ({
    type: ActionType.GET_OFFERS,
    payload: offers,
  }),
  hoverCityCard: (hoverCardIndex) => ({
    type: ActionType.HOVER_CITY_CARD,
    payload: hoverCardIndex,
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  getUserInfo: (user) => ({
    type: ActionType.USER,
    payload: user,
  }),
  getCurrentRoom: (room) => ({
    type: ActionType.GET_CURRENT_ROOM,
    payload: room,
  }),
  getNearbyOffers: (offers) => ({
    type: ActionType.GET_NEARBY_OFFERS,
    payload: offers,
  }),
  getComments: (comments) => ({
    type: ActionType.GET_COMMENTS,
    payload: comments,
  }),
  logout: () => ({
    type: ActionType.LOGOUT,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
};
