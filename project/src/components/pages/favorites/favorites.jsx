import React, {useEffect} from 'react';
import FavoritesCity from './favorites-city/favorites-city';
import PropTypes from 'prop-types';
import favoritesCityProp from './favorites-city/favorites-city.prop';
import { fetchFavoritesOffers } from '../../../store/api-actions';
import Header from '../../common/header/header';
import { getFavoritesOffers } from '../../../store/favorites/selectors';
import { connect, useDispatch } from 'react-redux';

function Favorites({ favoritesOffers = {} }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesOffers());
  }, [dispatch]);

  const isFavouritelList = !!Object.keys(favoritesOffers).length;

  return (
    <div className="page">
      <Header />
      {
        isFavouritelList ? (
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {Object.keys(favoritesOffers).map(( city ) => (
                    <FavoritesCity
                      key={city}
                      city={city}
                      offers={favoritesOffers[city].offers}
                    />
                  ))}
                </ul>
              </section>
            </div>
          </main>
        ) : (
          <main className="page__main page__main--favorites page__main--favorites-empty">
            <div className="page__favorites-container container">
              <section className="favorites favorites--empty">
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                </div>
              </section>
            </div>
          </main>
        )
      }
    </div>
  );
}

Favorites.propTypes = PropTypes.arrayOf(favoritesCityProp).isRequired;

const mapStateToProps = (state) => ({
  favoritesOffers: getFavoritesOffers(state),
});

export { Favorites };
export default connect(mapStateToProps, null)(Favorites);

