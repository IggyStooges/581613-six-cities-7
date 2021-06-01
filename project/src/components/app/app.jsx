import React from 'react';
import Main from '../main/main';
import PropTypes from 'prop-types';

function App({placesAmount}) {
  return <Main placesAmount={placesAmount} />;
}

App.propTypes = {
  placesAmount: PropTypes.number.isRequired,
};

export default App;
