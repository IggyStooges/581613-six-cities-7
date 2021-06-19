import React, { useEffect, useRef, useState } from 'react';
import leaflet from 'leaflet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { offerProp } from '../../app/app.prop';
import { ZOOM, ICON } from '../../../const';
import 'leaflet/dist/leaflet.css';

function Map({ cityLocation, offers, hoveredCardLocation }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const locations = offers.map((offer) => offer.location);
  const cityLocationCoordinates = Object.values(cityLocation).slice(0, 2);

  console.log(locations)

  const checkActiveLocation = (location) => {
    if (!hoveredCardLocation) {
      return false;
    }

    return location.latitude === hoveredCardLocation.latitude && location.longitude === hoveredCardLocation.longitude;
  }

  useEffect(() => {
    map && map.remove();
    setMap(null);
  }, [cityLocation]);

  useEffect(() => {
    const { current: mapContainer } = mapRef;

    if (mapContainer && map === null) {
      const instance = leaflet.map(mapContainer, {
        center: {
          lat: cityLocation.latitude,
          lng: cityLocation.longitude,
        },
        zoom: cityLocation.zoom,
        zoomControl: false,
        marker: true,
      });

      leaflet
        .tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        })
        .addTo(instance);

      instance.setView(cityLocationCoordinates, ZOOM);
      locations.forEach((location) => {
        const isActiveIcon = checkActiveLocation(location);
        let icon = null;

        if (isActiveIcon) {
          icon = leaflet.icon({
            iconUrl: ICON.activeIconUrl,
            iconSize: ICON.iconSize,
          })
        } else {
          icon = leaflet.icon({
            iconUrl: ICON.iconUrl,
            iconSize: ICON.iconSize,
          })
        }

        leaflet
          .marker({
            lat: location.latitude,
            lng: location.longitude,
          }, { icon })
          .addTo(instance);
      });

      setMap(instance);
    }

  }, [mapRef, map]);

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
  }).isRequired,
  hoveredCardLocation: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  hoveredCardLocation: state.hoveredCardLocation,
});

export { Map };
export default connect(mapStateToProps, null)(Map);
