import React from 'react';
import { render, screen } from '@testing-library/react';
import Review from './review';

const mockReview = {
  id: 2,
  user: {
    avatarUrl: 'src',
    name: 'John Doe',
  },
  comment: 'my comment',
  rating: 4,
  date: '2019-05-08T14:13:56.569Z',
};

describe('Component: Review', () => {

  it('should render correctly', () => {
    render(<Review review={mockReview}/>);

    expect(screen.getByText('my comment')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
