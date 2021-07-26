import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Favorites from './favorites';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createAPI } from '../../../api';
import { AuthorizationStatus } from '../../../const';

let store = null;
let history = null;
let createFakeStore = null;

describe('Component: Favorites', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    createFakeStore = configureStore([thunk.withExtraArgument(createAPI(() => {}))]);
  });

  it('should render correctly if nothing yet saved', () => {
    store = createFakeStore({
      USER: { authorizationStatus: AuthorizationStatus.NO_AUTH, user: null },
      FAVORITES: {
        favoritesList: [],
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Favorites
            favoritesOffers={{}}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
  });

  it('should render correctly if saved favourite offer', () => {
    const mockFavoritesOffers = {
      Amsterdam: {
        offers: [
          {
            'bedrooms': 3,
            'city': {
              'location': {
                latitude: 52.37454,
                longitude: 4.897976,
                'zoom': 10,
              },
              'name': 'Amsterdam',
            },
            'description': 'My Favorite Room in Amsterdam',
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
            'title': 'My Favorite Room in Amsterdam',
            'type': 'apartment',
          },
        ],
        location: {
          latitude: 52.37454,
          longitude: 4.897976,
          zoom: 13,
        },
      },
    };

    store = createFakeStore({
      USER: { authorizationStatus: AuthorizationStatus.NO_AUTH, user: null },
      FAVORITES: {
        favoritesList: mockFavoritesOffers,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Favorites
            favoritesOffers={mockFavoritesOffers}
          />
        </Router>
      </Provider>,
    );


    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText('My Favorite Room in Amsterdam')).toBeInTheDocument();
  });
});
