import React, { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { offerProp } from '../../app/app.prop';
import { ZOOM, ICON } from '../../../const';
import {getHoverCardIndex} from '../../../store/offers/selectors';
import 'leaflet/dist/leaflet.css';

function Map({ cityLocation, offers, hoverCardIndex }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const locations = offers.map((offer) => offer.location);
  const cityLocationCoordinates = cityLocation ? Object.values(cityLocation).slice(0, 2) : [0, 0];

  useEffect(() => {
    const { current: mapContainer } = mapRef;

    if (mapContainer && mapInstance.current === null) {
      const instance = leaflet.map(mapContainer, {
        center: {
          lat: cityLocation?.latitude,
          lng: cityLocation?.longitude,
        },
        zoom: cityLocation?.zoom,
        zoomControl: false,
        marker: true,
      });

      leaflet
        .tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        })
        .addTo(instance);

      mapInstance.current = instance;
    }

  }, [mapRef, hoverCardIndex, cityLocation]);

  useEffect(() => {

    if (mapInstance.current) {
      mapInstance.current.setView(cityLocationCoordinates, ZOOM);

      locations.forEach((location) => {
        const icon = leaflet.icon({
          iconUrl: ICON.iconUrl,
          iconSize: ICON.iconSize,
        });

        leaflet
          .marker({
            lat: location?.latitude,
            lng: location?.longitude,
          }, { icon })
          .addTo(mapInstance.current);
      });
    }

  }, [cityLocationCoordinates, locations]);

  useEffect(() => {
    const { current: instance } = mapInstance;

    if (mapInstance.current) {
      locations.forEach((location, index) => {
        const isActiveIcon = hoverCardIndex === index;
        let icon = null;

        if (isActiveIcon) {
          icon = leaflet.icon({
            iconUrl: ICON.activeIconUrl,
            iconSize: ICON.iconSize,
          });
        } else {
          icon = leaflet.icon({
            iconUrl: ICON.iconUrl,
            iconSize: ICON.iconSize,
          });
        }

        leaflet
          .marker({
            lat: location?.latitude,
            lng: location?.longitude,
          }, { icon })
          .addTo(instance);
      });
    }

  }, [hoverCardIndex, locations]);

  return (
    <div ref={mapRef} style={{ height: '100%', width: '100%' }}></div>
  );
}

Map.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
  cityLocation: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
  }),
  hoverCardIndex: PropTypes.number,
};

const mapStateToProps = (state) => ({
  hoverCardIndex: getHoverCardIndex(state),
});

export { Map };
export default connect(mapStateToProps, null)(Map);
