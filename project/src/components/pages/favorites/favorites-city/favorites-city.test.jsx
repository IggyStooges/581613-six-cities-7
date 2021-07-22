import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import FavoritesCity from './favorites-city';
import { createMemoryHistory } from 'history';

let fakeApp = null;

const mockOffers = [
  {
    price: 123,
    previewImage: 'src://url',
    type: 'room',
    rating: 5,
    title: 'cozy home',
    id: 1261,
  },
];

describe('Component: FavoritesCity', () => {
  beforeAll(() => {
    const history = createMemoryHistory();

    fakeApp = (
      <Router history={history}>
        <FavoritesCity city='Paris' offers={mockOffers} />
      </Router>
    );
  });

  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('€123')).toBeInTheDocument();
    expect(screen.getByText('room')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('cozy home')).toBeInTheDocument();
  });
});
