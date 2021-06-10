import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mocks/offers.js';
import adaptToClient from './utils/adaptToClient';

const adaptOffers = offers.map((offer) => adaptToClient(offer));

ReactDOM.render(
  <React.StrictMode>
    <App offers={adaptOffers} />
  </React.StrictMode>,
  document.getElementById('root'));
