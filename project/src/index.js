import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  PLACES_AMOUNT: 312,
};

ReactDOM.render(
  <React.StrictMode>
    <App placesAmount={Setting.PLACES_AMOUNT}/>
  </React.StrictMode>,
  document.getElementById('root'));
