import React from 'react';
import { render, screen } from '@testing-library/react';
import RatingStars from './rating-stars';

describe('Component: RatingStars', () => {
  it('should render correctly', () => {
    render(<RatingStars onChange={jest.fn()} />);

    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
    expect(screen.getByDisplayValue('4')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
  });
});
