import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { AuthorizationStatus } from "../../../const";
import SortOptions from "./sort-options";

let store = null;
let fakeApp = null;
let history = null;

describe("Component: SortOptions", () => {
  beforeEach(() => {
    history = createMemoryHistory();
    const createFakeStore = configureStore({});
    store = createFakeStore({
      OFFERS: { offers: {}, isDataLoaded: true },
      CITIES: { city: "Paris" },
      USER: { authorizationStatus: AuthorizationStatus.NO_AUTH, user: null },
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <SortOptions
            onSortOptionChange={jest.fn()}
            currentSortOption="Price: low to high"
          />
        </Router>
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  })

  it("should render list correctly", () => {
    const { getByTestId, getByText, getAllByText } = render(fakeApp);

    const optionsList = getByTestId("options-list");
    const currentOption = getByTestId("current-option");

    expect(optionsList).toContainElement(getByText("Popular"));
    expect(optionsList).toContainElement(getByText("Price: high to low"));
    expect(optionsList).toContainElement(getByText("Top rated first"));
    expect(optionsList).toContainElement(getAllByText("Price: low to high")[1]);
    expect(currentOption).toContainElement(getAllByText("Price: low to high")[0]);
  });
});
