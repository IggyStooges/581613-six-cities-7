import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import thunk from 'redux-thunk';
import { createAPI } from './api';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { fetchOffers, checkAuth } from './store/api-actions';
import rootReducer from './store/root-reducer';
import { requireAuthorization } from './store/action';
import { AuthorizationStatus } from './const';
import { redirect, redirectToLogin } from './store/middlewares/redirect';
import browserHistory from './browser-history';

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(createAPI(() =>
      store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)),
    ))),
    applyMiddleware(redirect),
    applyMiddleware(redirectToLogin),
  ),
);

store.dispatch(checkAuth());
store.dispatch(fetchOffers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
