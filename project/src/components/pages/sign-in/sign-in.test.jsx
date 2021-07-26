import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { AuthorizationStatus } from '../../../const';
import SignIn from './sign-in';

const EXPECTED_SIGN_IN_ELEMENTS_AMOUNT = 3;

describe('Component: SignIn', () => {
  it('should render "SignIn" when user navigate to "login" url', () => {
    const history = createMemoryHistory();
    history.push('/login');
    const createFakeStore = configureStore({});

    const store = createFakeStore({
      OFFERS: { offers: {}, isDataLoaded: true },
      CITIES: { city: 'Paris' },
      USER: { authorizationStatus: AuthorizationStatus.NO_AUTH, user: null },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <SignIn authorizationStatus={AuthorizationStatus.NO_AUTH}/>
        </Router>
      </Provider>,
    );


    expect(screen.getAllByText('Sign in').length).toBe(EXPECTED_SIGN_IN_ELEMENTS_AMOUNT);
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('E-mail')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('login'), 'qwerty@qwerty.ru');
    userEvent.type(screen.getByTestId('password'), '123456');

    expect(screen.getByDisplayValue(/qwerty@qwerty.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });
});
