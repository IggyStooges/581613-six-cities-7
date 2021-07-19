import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { sortOptions } from '../../../const';

function SortOptions({ onSortOptionChange, currentSortOption }) {
  const [isListOpened, setIslistOpened] = useState(false);

  const sortOptionsValues = Object.values(sortOptions);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={() => setIslistOpened(!isListOpened)} className="places__sorting-type" tabIndex="0" data-testid="current-option">
        {currentSortOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isListOpened && 'places__options--opened'}`} data-testid="options-list" >
        {
          sortOptionsValues.map((option) => (
            <li
              key={option}
              className={`places__option ${option === currentSortOption && 'places__option--active'}`}
              tabIndex="0"
              onClick={() => onSortOptionChange(option)}
            >
              {option}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

SortOptions.propTypes = {
  onSortOptionChange: PropTypes.func.isRequired,
  currentSortOption: PropTypes.string.isRequired,
};

export default SortOptions;
