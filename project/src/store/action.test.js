import {
  changeCity,
  getOffers,
  hoverCityCard,
  requireAuthorization,
  getUserInfo,
  getCurrentRoom,
  getNearbyOffers,
  getComments,
  userLogout,
  redirectToRoute,
  getFavoritesOffers,
  markFavoriteOffer,
  ActionType
} from './action';

describe('Actions', () => {
  it('action creator for change city returns correct action', () => {
    const expectedAction = {
      type: ActionType.CHANGE_CITY,
      payload: 'Paris',
    };

    expect(changeCity('Paris')).toEqual(expectedAction);
  });

  it('action creator for get offers returns correct action', () => {
    const mockOffers = [
      {
        bedrooms: 3,
        city: {
          location: {
            latitude: 52.370216,
            longitude: 4.895168,
            zoom: 10,
          },
          name: 'Amsterdam',
        },
        description:
          'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
        goods: [
          'Heating',
          'Kitchen',
          'Cable TV',
          'Washing machine',
          'Coffee machine',
          'Dishwasher',
        ],
        host: {
          avatarUrl: 'img/1.png',
          id: 3,
          isPro: true,
          name: 'Angelina',
        },
        id: 1,
        images: ['img/1.png', 'img/2.png'],
        isFavorite: false,
        isPremium: false,
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 8,
        },
        maxAdults: 4,
        previewImage: 'img/1.png',
        price: 120,
        rating: 4.8,
        title: 'Beautiful & luxurious studio at great location',
        type: 'apartment',
      },
    ];
    const expectedAction = {
      type: ActionType.GET_OFFERS,
      payload: mockOffers,
    };

    expect(getOffers(mockOffers)).toEqual(expectedAction);
  });

  it('action creator for hover city card returns correct action', () => {
    const offerId = 55;
    const expectedAction = {
      type: ActionType.HOVER_CITY_CARD,
      payload: offerId,
    };

    expect(hoverCityCard(offerId)).toEqual(expectedAction);
  });

  it('action creator for require authorization returns correct action', () => {
    const authorizationStatus = 'AUTH';
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: authorizationStatus,
    };

    expect(requireAuthorization(authorizationStatus)).toEqual(expectedAction);
  });

  it('action creator for get user info returns correct action', () => {
    const user = { login: 'email@email.ru', avatarUrl: 'url:src' };
    const expectedAction = {
      type: ActionType.USER,
      payload: user,
    };

    expect(getUserInfo(user)).toEqual(expectedAction);
  });

  it('action creator for get current room returns correct action', () => {
    const room = {
      bedrooms: 3,
      city: {
        location: {
          latitude: 52.370216,
          longitude: 4.895168,
          zoom: 10,
        },
        name: 'Amsterdam',
      },
      description:
        'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      goods: [
        'Heating',
        'Kitchen',
        'Cable TV',
        'Washing machine',
        'Coffee machine',
        'Dishwasher',
      ],
      host: {
        avatarUrl: 'img/1.png',
        id: 3,
        isPro: true,
        name: 'Angelina',
      },
      id: 1,
      images: ['img/1.png', 'img/2.png'],
      isFavorite: false,
      isPremium: false,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },
      maxAdults: 4,
      previewImage: 'img/1.png',
      price: 120,
      rating: 4.8,
      title: 'Beautiful & luxurious studio at great location',
      type: 'apartment',
    };
    const expectedAction = {
      type: ActionType.GET_CURRENT_ROOM,
      payload: room,
    };

    expect(getCurrentRoom(room)).toEqual(expectedAction);
  });

  it('action creator for get nearby offers returns correct action', () => {
    const mockOffers = [
      {
        bedrooms: 3,
        city: {
          location: {
            latitude: 52.370216,
            longitude: 4.895168,
            zoom: 10,
          },
          name: 'Amsterdam',
        },
        description:
          'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
        goods: [
          'Heating',
          'Kitchen',
          'Cable TV',
          'Washing machine',
          'Coffee machine',
          'Dishwasher',
        ],
        host: {
          avatarUrl: 'img/1.png',
          id: 3,
          isPro: true,
          name: 'Angelina',
        },
        id: 1,
        images: ['img/1.png', 'img/2.png'],
        isFavorite: false,
        isPremium: false,
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 8,
        },
        maxAdults: 4,
        previewImage: 'img/1.png',
        price: 120,
        rating: 4.8,
        title: 'Beautiful & luxurious studio at great location',
        type: 'apartment',
      },
    ];
    const expectedAction = {
      type: ActionType.GET_NEARBY_OFFERS,
      payload: mockOffers,
    };

    expect(getNearbyOffers(mockOffers)).toEqual(expectedAction);
  });

  it('action creator for get comments returns correct action', () => {
    const mockComments = [
      {
        comment:
          'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
        date: '2019-05-08T14:13:56.569Z',
        id: 1,
        rating: 4,
        user: {
          avatarUrl: 'img/1.png',
          id: 4,
          isPro: false,
          name: 'Max',
        },
      },
    ];
    const expectedAction = {
      type: ActionType.GET_COMMENTS,
      payload: mockComments,
    };

    expect(getComments(mockComments)).toEqual(expectedAction);
  });

  it('action creator for logout returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOGOUT,
    };

    expect(userLogout()).toEqual(expectedAction);
  });

  it('action creator for redirect to route returns correct action', () => {
    const url = '/favorites';
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: url,
    };

    expect(redirectToRoute(url)).toEqual(expectedAction);
  });

  it('action creator for get favorites offers returns correct action', () => {
    const mockOffers = [
      {
        bedrooms: 3,
        city: {
          location: {
            latitude: 52.370216,
            longitude: 4.895168,
            zoom: 10,
          },
          name: 'Amsterdam',
        },
        description:
          'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
        goods: [
          'Heating',
          'Kitchen',
          'Cable TV',
          'Washing machine',
          'Coffee machine',
          'Dishwasher',
        ],
        host: {
          avatarUrl: 'img/1.png',
          id: 3,
          isPro: true,
          name: 'Angelina',
        },
        id: 1,
        images: ['img/1.png', 'img/2.png'],
        isFavorite: false,
        isPremium: false,
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 8,
        },
        maxAdults: 4,
        previewImage: 'img/1.png',
        price: 120,
        rating: 4.8,
        title: 'Beautiful & luxurious studio at great location',
        type: 'apartment',
      },
    ];
    const expectedAction = {
      type: ActionType.GET_FAVORITES_OFFERS,
      payload: mockOffers,
    };

    expect(getFavoritesOffers(mockOffers)).toEqual(expectedAction);
  });

  it('action creator for mark favorite offer returns correct action', () => {
    const expectedAction = {
      type: ActionType.MARK_FAVORITE_OFFER,
    };

    expect(markFavoriteOffer()).toEqual(expectedAction);
  });
});
