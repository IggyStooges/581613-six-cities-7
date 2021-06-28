import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { comments } from './mocks/comments';
import adaptToClient from './utils/adaptToClient';
import thunk from 'redux-thunk';
import { createAPI } from './api';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {fetchOffers} from './store/api-actions';
import { reducer } from './store/reducer';
import { ActionCreator } from './store/action';

const api = createAPI(
  () => store.dispatch(ActionCreator.requireAuthorization()),
);

const adaptReviews = comments.map((comment) => adaptToClient(comment));

const store = createStore(reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)),
  ));

store.dispatch(fetchOffers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={adaptReviews} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
