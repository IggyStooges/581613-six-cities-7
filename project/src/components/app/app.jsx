import React from 'react';
import Main from '../pages/main/main';
import SignIn from '../pages/sign-in/sign-in';
import Favorites from '../pages/favorites/favorites';
import Room from '../pages/room/room';
import ErrorPage from '../pages/error-page/error-page';
import Loader from '../common/loader/loader';
import { offerProp, authorizationStatusProp } from './app.prop';
import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PrivateRoute from '../private-route/private-route';
import browserHistory from '../../browser-history';
import { getOffers, getLoadedStatus } from '../../store/offers/selectors';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { getCurrentRoom, getNearbyOffers, getComments } from '../../store/room/selectors';

function App({ offers, isDataLoaded, authorizationStatus }) {
  const { MAIN, SIGN_IN, FAVORITES, ROOM } = AppRoute;

  if (!isDataLoaded) {
    return (
      <Loader />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={MAIN}>
          <Main offers={offers} />
        </Route>
        <Route exact path={SIGN_IN}>
          <SignIn authorizationStatus={authorizationStatus} />
        </Route>
        <PrivateRoute exact path={FAVORITES} render={() => <Favorites />} />
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
  offers: PropTypes.arrayOf(offerProp).isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  authorizationStatus: authorizationStatusProp.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getOffers(state),
  nearbyOffers: getNearbyOffers(state),
  currentRoom: getCurrentRoom(state),
  comments: getComments(state),
  isDataLoaded: getLoadedStatus(state),
  authorizationStatus: getAuthorizationStatus(state),
});

export { App };
export default connect(mapStateToProps, null)(App);
