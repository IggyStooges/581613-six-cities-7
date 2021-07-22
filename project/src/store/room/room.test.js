import { room } from './room';
import { ActionType } from '../action';
import adaptToClient, {adaptDataList} from '../../utils/adaptToClient';

const initialState = {
  nearbyOffers: [],
  currentRoom: null,
  comments: [],
  error: null,
  isRoomDataLoaded: false,
};

describe('Reducer: room', () => {
  it('without action should return initial state', () => {
    expect(room(initialState, {})).toEqual(initialState);
  });

  it('action get current room return updated state', () => {
    const getCurrenRoomAction = {
      type: ActionType.GET_CURRENT_ROOM,
      payload: {
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
    };

    expect(room(initialState, getCurrenRoomAction)).toEqual({
      ...initialState,
      currentRoom: adaptToClient(getCurrenRoomAction.payload),
      isRoomDataLoaded: true,
    });
  });

  it('action login should return updated state', () => {
    const getNearbyOffetsAction = {
      type: ActionType.GET_NEARBY_OFFERS,
      payload: [{
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
      }],
    };

    expect(room(initialState, getNearbyOffetsAction)).toEqual({...initialState, nearbyOffers: adaptDataList(getNearbyOffetsAction.payload)});

  });

  it('action get comments return updated state', () => {
    const getCommentsAction = {
      type: ActionType.GET_COMMENTS,
      payload: [{
        'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
        'date': '2019-05-08T14:13:56.569Z',
        'id': 1,
        'rating': 4,
        'user': {
          'avatarUrl': 'img/1.png',
          'id': 4,
          'isPro': false,
          'name': 'Max',
        },
      }],
    };

    expect(room(initialState, getCommentsAction)).toEqual({...initialState, comments: adaptDataList(getCommentsAction.payload)});
  });
});
