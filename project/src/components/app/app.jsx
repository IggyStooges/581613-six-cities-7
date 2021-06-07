import React from 'react';
import Main from '../pages/main/main';
import SignIn from '../pages/sign-in/sign-in';
import Favorites from '../pages/favorites/favorites';
import Room from '../pages/room/room';
import ErrorPage from '../pages/error-page/error-page';
import appProp from './app.prop';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import PropTypes from 'prop-types';


function App({ offers }) {
  const { MAIN, SIGN_IN, FAVORITES, ROOM } = AppRoute;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={MAIN}>
          <Main offers={offers} />
        </Route>
        <Route exact path={SIGN_IN}>
          <SignIn />
        </Route>
        <Route exact path={FAVORITES}>
          <Favorites />
        </Route>
        <Route exact path={ROOM}>
          <Room />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  offers: PropTypes.arrayOf(appProp).isRequired,
};

export default App;
