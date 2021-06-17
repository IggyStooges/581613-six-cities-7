import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { nearbyOffers, offers } from './mocks/offers.js';
import { comments } from './mocks/comments';
import adaptToClient from './utils/adaptToClient';

const adaptOffers = offers.map((offer) => adaptToClient(offer));
const adaptReviews = comments.map((comment) => adaptToClient(comment));
const adaptNearbyReviews = nearbyOffers.map((offer) => adaptToClient(offer));

ReactDOM.render(
  <React.StrictMode>
    <App offers={adaptOffers} reviews={adaptReviews} nearbyOffers={adaptNearbyReviews}/>
  </React.StrictMode>,
  document.getElementById('root'));
