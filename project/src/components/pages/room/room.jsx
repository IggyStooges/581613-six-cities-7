import React, { useEffect } from 'react';
import { OffersListType } from '../../../const';
import PropTypes from 'prop-types';
import { offerProp, reviewProp } from '../../app/app.prop';
import OffersList from '../../common/offers-list/offers-list';
import { useParams } from 'react-router-dom';
import RoomProperty from './room-property';
import Header from '../../common/header/header';
import { fetchCurrentRoom } from '../../../store/api-actions';
import { store } from '../../../index';
import { connect } from 'react-redux';

function Room({ currentRoom, comments, nearbyOffers }) {
  const { id } = useParams();

  useEffect(() => {
    store.dispatch(fetchCurrentRoom(id));
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [id]);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <RoomProperty
          currentRoom={currentRoom}
          reviews={comments}
          nearbyOffers={nearbyOffers}
        />
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={nearbyOffers} type={OffersListType.NEARBY} />
          </section>
        </div>
      </main>
    </div>
  );
}

Room.propTypes = {
  currentRoom: offerProp,
  comments: PropTypes.arrayOf(reviewProp).isRequired,
  nearbyOffers: PropTypes.arrayOf(offerProp).isRequired,
};

const mapStateToProps = (state) => ({
  nearbyOffers: state.nearbyOffers,
  currentRoom: state.currentRoom,
  comments: state.comments,
});

export { Room };
export default connect(mapStateToProps, null)(Room);
