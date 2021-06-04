import React from 'react';
import Main from '../pages/main/main';
import SignIn from '../pages/sign-in/sign-in';
import Favorites from '../pages/favorites/favorites';
import Room from '../pages/room/room';
import ErrorPage from '../pages/error-page/error-page';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';

const cards = [
  {
    price: 120,
    pictureUrl: 'img/apartment-01.jpg',
    title: 'Beautiful & luxurious apartment at great location',
    apartmentType: 'Apartment',
    rating: 80,
  },
  {
    price: 80,
    pictureUrl: 'img/room.jpg',
    title: 'Wood and stone place',
    apartmentType: 'Private room',
    rating: 80,
  },
  {
    price: 132,
    pictureUrl: 'img/apartment-02.jpg',
    title: 'Canal View Prinsengracht',
    apartmentType: 'Apartment',
    rating: 80,
  },
  {
    price: 180,
    pictureUrl: 'img/apartment-03.jpg',
    title: 'Nice, cozy, warm big bed apartment',
    apartmentType: 'Apartment',
    rating: 100,
  },
  {
    price: 80,
    pictureUrl: 'img/room.jpg',
    title: 'Wood and stone place',
    apartmentType: 'Private room',
    rating: 80,
  },
];

function App() {
  const { MAIN, SIGN_IN, FAVORITES, ROOM } = AppRoute;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={MAIN}>
          <Main cards={cards} />
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

export default App;
