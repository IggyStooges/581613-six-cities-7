import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ErrorPage from "./error-page";

describe("Component: ErrorPage", () => {
  it("should render correctly", () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <ErrorPage />
      </Router>
    );
    const headerElement = getByText("404. Sorry... Page Not Found.");
    const linkElement = getByText("Вернуться на главную");

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
