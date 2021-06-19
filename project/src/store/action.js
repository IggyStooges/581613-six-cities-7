export const ActionType = {
  CHANGE_CITY: 'changeCity',
  GET_OFFERS: 'getOffers',
  GET_NEARBY_OFFERS: 'getNearbyOffers',
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
  getOffers: () => ({
    type: ActionType.GET_OFFERS,
  }),
  getNearbyOffers: () => ({
    type: ActionType.GET_NEARBY_OFFERS,
  }),
};
