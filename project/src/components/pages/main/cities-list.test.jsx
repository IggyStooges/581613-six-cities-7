import React from 'react';
import { render, screen } from '@testing-library/react';
import CitiesList from './cities-list';

let fakeApp = null;

describe('Component: CitiesList', () => {
  beforeAll(() => {

    fakeApp = (
      <CitiesList currentCity='Cologne' onCityChange={jest.fn()}/>
    );
  });

  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText('Cologne')).toBeInTheDocument();

  });
});
