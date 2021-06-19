import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { comments } from './mocks/comments';
import adaptToClient from './utils/adaptToClient';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './store/reducer';

const adaptReviews = comments.map((comment) => adaptToClient(comment));

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={adaptReviews} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
