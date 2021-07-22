import { ActionType } from '../action';
import {adaptDataList} from '../../utils/adaptToClient';
import { CityType } from '../../const';
import {offers as offersReducer} from './offers';

const initialState = {
  city: CityType.PARIS,
  offers: [],
  hoverCardIndex: null,
  isDataLoaded: false,
};

describe('Reducer: offers', () => {
  it('without action should return initial state', () => {
    expect(offersReducer(initialState, {})).toEqual(initialState);
  });

  it('action change city should return updated state', () => {
    const changeCityAction = {
      type: ActionType.CHANGE_CITY,
      payload: CityType.COLOGNE,
    };

    expect(offersReducer(initialState, changeCityAction)).toEqual({...initialState, city: changeCityAction.payload});
  });

  it('action hover city card return updated state', () => {
    const hoverCityCardAction = {
      type: ActionType.HOVER_CITY_CARD,
      payload: 88,
    };

    expect(offersReducer(initialState, hoverCityCardAction)).toEqual({...initialState, hoverCardIndex: hoverCityCardAction.payload});
  });

  it('action get offers return updated state', () => {
    const getOffersAction = {
      type: ActionType.GET_OFFERS,
      payload: [{
        'bedrooms': 3,
        'city': {
          'location': {
            'latitude': 52.370216,
            'longitude': 4.895168,
            'zoom': 10,
          },
          'name': 'Amsterdam',
        },
        'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
        'goods': ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
        'host': {
          'avatarUrl': 'img/1.png',
          'id': 3,
          'isPro': true,
          'name': 'Angelina',
        },
        'id': 1,
        'images': ['img/1.png', 'img/2.png'],
        'isFavorite': false,
        'isPremium': false,
        'location': {
          'latitude': 52.35514938496378,
          'longitude': 4.673877537499948,
          'zoom': 8,
        },
        'maxAdults': 4,
        'previewImage': 'img/1.png',
        'price': 120,
        'rating': 4.8,
        'title': 'Beautiful & luxurious studio at great location',
        'type': 'apartment',
      }],
    };

    expect(offersReducer(initialState, getOffersAction)).toEqual({...initialState, offers: adaptDataList(getOffersAction.payload), isDataLoaded: true});
  });
});
