import React from 'react';
import Main from '../pages/main/main';
import SignIn from '../pages/sign-in/sign-in';
import Favorites from '../pages/favorites/favorites';
import Room from '../pages/room/room';
import ErrorPage from '../pages/error-page/error-page';
import Loader from '../common/loader/loader';
import { offerProp, reviewProp, authorizationStatusPtop } from './app.prop';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import groupOffersByCity from '../../utils/sortByCity';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PrivateRoute from '../private-route/private-route';
import browserHistory from '../../browser-history';

function App({ offers, reviews, nearbyOffers, isDataLoaded, authorizationStatus }) {
  const { MAIN, SIGN_IN, FAVORITES, ROOM } = AppRoute;
  const favorites = offers.filter(({ isFavorite }) => isFavorite);

  const sortedFavorites = groupOffersByCity(favorites);

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
        <PrivateRoute exact path={FAVORITES} render={() => <Favorites favorites={sortedFavorites} />} />
        <Route exact path={ROOM}>
          <Room offers={offers} nearbyOffers={nearbyOffers} reviews={reviews} />
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
  nearbyOffers: PropTypes.arrayOf(offerProp).isRequired,
  reviews: PropTypes.arrayOf(reviewProp).isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  authorizationStatus: authorizationStatusPtop.isRequired,
};

const mapStateToProps = (state) => ({
  offers: state.offers,
  nearbyOffers: state.nearbyOffers,
  isDataLoaded: state.isDataLoaded,
  authorizationStatus: state.authorizationStatus,
});

export { App };
export default connect(mapStateToProps, null)(App);
