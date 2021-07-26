import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Room from './room';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createAPI } from '../../../api';
import thunk from 'redux-thunk';
import { AuthorizationStatus } from '../../../const';

let history = null;
let store = null;
let fakeApp = null;
let createFakeStore = null;
const EXPECTED_ELEMENTS_WITH_DATA_TITLE = 2;

const mockReviews = [
  {
    id: 2,
    user: {
      avatarUrl: 'src',
      name: 'John Doe',
    },
    comment: 'my comment',
    rating: 4,
    date: '2019-05-08T14:13:56.569Z',
  },
  {
    id: 1,
    user: {
      avatarUrl: 'src',
      name: 'Steven Gerrard',
    },
    comment: 'my comment number two',
    rating: 4,
    date: '2019-05-08T14:13:56.569Z',
  },
];

const mockOffers = [
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Paris',
    },
    description: 'Great Room',
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

describe('Component: Room', () => {
  beforeAll(() => {
    history = createMemoryHistory();

    createFakeStore = configureStore([thunk.withExtraArgument(createAPI(() => {}))]);

    window.scrollTo = () => {};
    store = createFakeStore({
      OFFERS: { offers: [], isDataLoaded: true },
      CITIES: { city: 'Paris' },
      USER: { authorizationStatus: AuthorizationStatus.NO_AUTH, user: null },
      ROOM: {
        nearbyOffers: mockOffers,
        currentRoom: mockOffers[0],
        comments: mockReviews,
        isRoomDataLoaded: false,
      },
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Room
            nearbyOffers={mockOffers}
            currentRoom={mockOffers[0]}
            comments={mockReviews}
          />
        </Router>
      </Provider>
    );
  });

  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText('Great Room')).toBeInTheDocument();
    expect(screen.getAllByText('Beautiful & luxurious studio at great location').length).toBe(EXPECTED_ELEMENTS_WITH_DATA_TITLE);
    expect(screen.getByText('Steven Gerrard')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('my comment')).toBeInTheDocument();
    expect(screen.getByText('my comment number two')).toBeInTheDocument();
  });
});
