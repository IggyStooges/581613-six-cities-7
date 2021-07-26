import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';

const mockReviews = [
  {
    id: 2,
    user: {
      avatarUrl: 'src',
      name: 'John Doe',
    },
    comment: 'my comment',
    rating: 4,
    date: '2019-05-08T14:13:56.569Z',
  },
  {
    id: 1,
    user: {
      avatarUrl: 'src',
      name: 'Steven Gerrard',
    },
    comment: 'my comment number two',
    rating: 4,
    date: '2019-05-08T14:13:56.569Z',
  },
];

describe('Component: ReviewsList', () => {

  it('should render correctly', () => {
    render(<ReviewsList reviews={mockReviews}/>);

    expect(screen.getByText('Steven Gerrard')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('my comment')).toBeInTheDocument();
    expect(screen.getByText('my comment number two')).toBeInTheDocument();
  });
});
