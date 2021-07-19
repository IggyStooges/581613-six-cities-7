import React from "react";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { CityType } from "../../../const";
import RoomProperty from "./room-property";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { AuthorizationStatus } from "../../../const";

let store = null;
let history = null;

const mockReviews = [
  {
    comment:
      "A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.",
    date: "2019-05-08T14:13:56.569Z",
    id: 1,
    rating: 4,
    user: {
      avatar_url: "img/1.png",
      id: 4,
      isPro: false,
      name: "Max",
    },
  },
];

const mockOffers = [
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: "Paris",
    },
    description: "Great Room",
    goods: [
      "Heating",
      "Kitchen",
      "Cable TV",
      "Washing machine",
      "Coffee machine",
      "Dishwasher",
    ],
    host: {
      avatar_url: "img/1.png",
      id: 3,
      isPro: true,
      name: "Angelina",
    },
    id: 1,
    images: ["img/1.png", "img/2.png"],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    maxAdults: 4,
    previewImage: "img/1.png",
    price: 120,
    rating: 4.8,
    title: "Beautiful & luxurious studio at great location",
    type: "apartment",
  },
];

describe("Component: RoomProperty", () => {
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
    render(
      <Provider store={store}>
        <Router history={history}>
          <RoomProperty
            nearbyOffers={mockOffers}
            currentRoom={mockOffers[0]}
            reviews={mockReviews}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
          />
        </Router>
      </Provider>
    );

    expect(screen.getByText("A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.")).toBeInTheDocument();
    expect(screen.getByText("Great Room")).toBeInTheDocument();
    expect(screen.getByText("Beautiful & luxurious studio at great location")).toBeInTheDocument();

  });
});
