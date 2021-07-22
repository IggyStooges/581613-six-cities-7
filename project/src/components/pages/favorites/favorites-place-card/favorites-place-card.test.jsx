import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import FavoritesPlaceCard from './favorites-place-card';
import { createMemoryHistory } from 'history';

let fakeApp = null;

describe('Component: FavoritesPlaceCard', () => {
  beforeAll(() => {
    const history = createMemoryHistory();

    fakeApp = (
      <Router history={history}>
        <FavoritesPlaceCard
          price={15}
          previewImage='src://url'
          apartmentType='room'
          rating={5}
          title='cozy home'
        />
      </Router>
    );
  });

  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText('€15')).toBeInTheDocument();
    expect(screen.getByText('room')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('cozy home')).toBeInTheDocument();
  });
});
