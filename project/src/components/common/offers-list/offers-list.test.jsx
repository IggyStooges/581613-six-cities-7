import React from "react";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import OffersList from "./offers-list";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import { AuthorizationStatus } from '../../../const';

let store = null;
let fakeApp = null;
let history = null;

const mockOffers = [
  {
    price: 123,
    previewImage: "src://url",
    type: "room",
    rating: 5,
    title: "cozy home",
    id: 1261,
  },
];

describe("Component: OffersList", () => {
  beforeAll(() => {
    const createFakeStore = configureStore({});
    history = createMemoryHistory();

    store = createFakeStore({
      OFFERS: { offers: {}, isDataLoaded: true },
      CITIES: { city: "Paris" },
      USER: { authorizationStatus: AuthorizationStatus.NO_AUTH, user: null },
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <OffersList offers={mockOffers} />
        </Router>
      </Provider>
    );
  });

  it("should render correctly", () => {
    render(fakeApp);

    expect(screen.getByText("€123")).toBeInTheDocument();
    expect(screen.getByText("room")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("cozy home")).toBeInTheDocument();
  });
});
