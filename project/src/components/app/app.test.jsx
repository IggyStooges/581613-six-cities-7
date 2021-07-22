import React from "react";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { AuthorizationStatus, AppRoute } from "../../const";
import thunk from 'redux-thunk';
import { createAPI } from '../../api';
import App from "./app";

let history = null;
let store = null;
let fakeApp = null;
let createFakeStore = null;

describe("Application Routing", () => {
  beforeAll(() => {
    history = createMemoryHistory();

    createFakeStore = configureStore([thunk.withExtraArgument(createAPI(() => {}))]);

    window.scrollTo = () => {};
    store = createFakeStore({
      OFFERS: { offers: [], isDataLoaded: true },
      CITIES: { city: "Paris" },
      USER: { authorizationStatus: AuthorizationStatus.NO_AUTH, user: null },
      ROOM: {
        nearbyOffers: [],
        currentRoom: null,
        comments: [],
        isRoomDataLoaded: false,
      },
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  });

  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.ROOT);
    render(fakeApp);

    expect(screen.getByText("No places to stay available")).toBeInTheDocument();
  });

  it('should render "Login" when user navigate to "/login"', () => {
    history.push(AppRoute.SIGN_IN);
    render(fakeApp);

    expect(screen.getAllByText(/Sign in/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Sign in/i)[1]).toBeInTheDocument();
    expect(screen.getAllByText(/Sign in/i)[2]).toBeInTheDocument();
  });

  it('should render "Room" when user navigate to "/offer/:id"', () => {
    history.push('/offer/55');
    render(fakeApp);

    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render "Favorites" when user navigate to "/favorites" without authorization', () => {
    history.push(AppRoute.FAVORITES);
    render(fakeApp);

    expect(screen.queryByText(/Saved listing/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Save properties to narrow down search or plan your future trips./i)).not.toBeInTheDocument();
  });

  it('should render "Favorites" when user navigate to "/favorites" with authorization', () => {
    store = createFakeStore({
      OFFERS: { offers: [], isDataLoaded: true },
      CITIES: { city: "Paris" },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: { login: "login", avatarUrl: "url" },
      },
      ROOM: {
        nearbyOffers: [],
        currentRoom: null,
        comments: [],
        isRoomDataLoaded: false,
      },
      FAVORITES: {
        favoritesList: []
      }
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );

    history.push(AppRoute.FAVORITES);
    render(fakeApp);

    expect(screen.getByText("Nothing yet saved.")).toBeInTheDocument();
    expect(screen.getByText("Save properties to narrow down search or plan your future trips.")).toBeInTheDocument();
  });

  it('should render "ErrorPage" when user navigate to non-existent route', () => {
    history.push(AppRoute.NOT_FOUND);
    render(fakeApp);

    expect(
      screen.getByText("404. Sorry... Page Not Found.")
    ).toBeInTheDocument();
    expect(screen.getByText("Вернуться на главную")).toBeInTheDocument();
  });
});
