import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import Header from './header';
import configureStore from 'redux-mock-store';
import { AuthorizationStatus } from '../../../const';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';

let history = null;
let createFakeStore= null;

describe('Component: Header', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    createFakeStore = configureStore({});
  });

  it('should render correctly if none authorization', () => {
    const store = createFakeStore({
      OFFERS: { offers: {}, isDataLoaded: true },
      CITIES: { city: 'Paris' },
      USER: { authorizationStatus: AuthorizationStatus.NO_AUTH, user: null },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Header
            onLogout={jest.fn()}
            authorizationStatus='AuthorizationStatus.NO_AUTH'
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render correctly if authorization', () => {
    const store = createFakeStore({
      OFFERS: { offers: {}, isDataLoaded: true },
      CITIES: { city: 'Paris' },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: {
          login: 'userName',
          avatarUrl: 'avatarUrl',
        },
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Header
            onLogout={jest.fn()}
            authorizationStatus='AuthorizationStatus.AUTH'
            user={{
              login: 'userName',
              avatarUrl: 'avatarUrl',
            }}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('userName')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
