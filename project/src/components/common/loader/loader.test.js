import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Loader from './loader';

describe('Component: Loader', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const {getByTestId} = render(
      <Router history={history}>
        <Loader />
      </Router>,
    );
    const loader = getByTestId('loader');

    expect(loader).toBeInTheDocument();
  });
});
