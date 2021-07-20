import React from "react";
import { render, screen } from "@testing-library/react";
import MainEmpty from "./main-empty";

let fakeApp = null;

describe("Component: MainEmpty", () => {
  beforeAll(() => {

    fakeApp = (
        <MainEmpty/>
    );
  });

  it("should render correctly", () => {
    render(fakeApp);

    expect(screen.getByText("No places to stay available")).toBeInTheDocument();
    expect(screen.getByText("We could not find any property available at the moment in")).toBeInTheDocument();

  });
});
