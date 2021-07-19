import React from "react";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { CityType } from "../../../const";
import Main from "./main";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { AuthorizationStatus } from "../../../const";

let store = null;
let history = null;

const mockOffers = [
  {
    "bedrooms": 3,
    "city": {
      "location": {
        "latitude": 52.370216,
        "longitude": 4.895168,
        "zoom": 10
      },
      "name": "Paris"
    },
    "description": "Great Room in Paris",
    "goods": ["Heating", "Kitchen", "Cable TV", "Washing machine", "Coffee machine", "Dishwasher"],
    "host": {
      "avatar_url": "img/1.png",
      "id": 3,
      "isPro": true,
      "name": "Angelina"
    },
    "id": 1,
    "images": ["img/1.png", "img/2.png"],
    "isFavorite": false,
    "isPremium": false,
    "location": {
      "latitude": 52.35514938496378,
      "longitude": 4.673877537499948,
      "zoom": 8
    },
    "maxAdults": 4,
    "previewImage": "img/1.png",
    "price": 120,
    "rating": 4.8,
    "title": "Great Room in Paris",
    "type": "apartment"
  },
  {
    "bedrooms": 3,
    "city": {
      "location": {
        "latitude": 52.370216,
        "longitude": 4.895168,
        "zoom": 10
      },
      "name": "Cologne"
    },
    "description": "Beautiful & luxurious studio at great location",
    "goods": ["Heating", "Kitchen", "Cable TV", "Washing machine", "Coffee machine", "Dishwasher"],
    "host": {
      "avatar_url": "img/1.png",
      "id": 3,
      "isPro": true,
      "name": "Angelina"
    },
    "id": 1,
    "images": ["img/1.png", "img/2.png"],
    "isFavorite": false,
    "isPremium": false,
    "location": {
      "latitude": 52.35514938496378,
      "longitude": 4.673877537499948,
      "zoom": 8
    },
    "maxAdults": 4,
    "previewImage": "img/1.png",
    "price": 120,
    "rating": 4.8,
    "title": "Beautiful & luxurious studio at great location",
    "type": "apartment"
  },
  {
    "bedrooms": 3,
    "city": {
      "location": {
        "latitude": 52.370216,
        "longitude": 4.895168,
        "zoom": 10
      },
      "name": "Amsterdam"
    },
    "description": "Luxury of Amsterdam.",
    "goods": ["Heating", "Kitchen", "Cable TV", "Washing machine", "Coffee machine", "Dishwasher"],
    "host": {
      "avatar_url": "img/1.png",
      "id": 3,
      "isPro": true,
      "name": "Angelina"
    },
    "id": 1,
    "images": ["img/1.png", "img/2.png"],
    "isFavorite": false,
    "isPremium": false,
    "location": {
      "latitude": 52.35514938496378,
      "longitude": 4.673877537499948,
      "zoom": 8
    },
    "maxAdults": 4,
    "previewImage": "img/1.png",
    "price": 120,
    "rating": 4.8,
    "title": "Beautiful & luxurious studio at great location",
    "type": "apartment"
  }
];

describe("Component: Main", () => {
  beforeAll(() => {
    const createFakeStore = configureStore({});
    history = createMemoryHistory();

    store = createFakeStore({
      OFFERS: { offers: {}, isDataLoaded: true },
      CITIES: { city: "Paris" },
      USER: { authorizationStatus: AuthorizationStatus.NO_AUTH, user: null },
    });
  });

  it("should render correctly", () => {
    render(<Provider store={store}>
      <Router history={history}>
        <Main
          offers={mockOffers}
          city={CityType.PARIS}
          onCityChange={jest.fn()}
        />
      </Router>
    </Provider>);

    expect(screen.getByText("Paris")).toBeInTheDocument();
    expect(screen.getByText("Great Room in Paris")).toBeInTheDocument();
  });
});
