import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import PlaceCard from './place-card';
import configureStore from 'redux-mock-store';
import { AuthorizationStatus } from '../../../const';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';

let store = null;
let fakeApp = null;

describe('Component: PlaceCard', () => {
  beforeAll(() => {
    const history = createMemoryHistory();
    const createFakeStore = configureStore({});
    store = createFakeStore({
      OFFERS: { offers: {}, isDataLoaded: true },
      CITIES: { city: 'Paris' },
      USER: { authorizationStatus: AuthorizationStatus.NO_AUTH, user: null },
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <PlaceCard
            price={15}
            previewImage='src://url'
            apartmentType='room'
            rating={5}
            title='cozy home'
            hasHoverEffect={false}
          />
        </Router>
      </Provider>
    );
  });

  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText('€15')).toBeInTheDocument();
    expect(screen.getByText('room')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('cozy home')).toBeInTheDocument();
  });
});
