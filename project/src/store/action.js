export const ActionType = {
  CHANGE_CITY: 'changeCity',
  GET_OFFERS: 'getOffers',
  GET_NEARBY_OFFERS: 'getNearbyOffers',
  HOVER_CITY_CARD: 'hoverCityCard',
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
  getNearbyOffers: () => ({
    type: ActionType.GET_NEARBY_OFFERS,
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
  logout: () => ({
    type: ActionType.LOGOUT,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
};
