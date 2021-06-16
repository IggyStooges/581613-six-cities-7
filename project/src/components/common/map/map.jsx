import React, { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import { CITY, ZOOM, ICON } from '../../../const';

const icon = leaflet.icon({
  iconUrl: ICON.iconUrl,
  iconSize: ICON.iconSize,
});

const offerCords = [52.3709553943508, 4.89309666406198];

function Map({ cityLocation = CITY, locations }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const { current: mapContainer } = mapRef;
    const map = leaflet.map(mapContainer, {
      center: cityLocation,
      zoom: ZOOM,
      zoomControl: false,
      marker: true,
    });

    leaflet
      .tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      })
      .addTo(map);

    map.setView(cityLocation, ZOOM);

    leaflet
      .marker(offerCords, { icon })
      .addTo(map);

    locations.forEach((location) => {
      leaflet
        .marker({
          lat: location.latitude,
          lng: location.longitude,
        }, { icon })
        .addTo(map);
    });
  });

  return (
    <div ref={mapRef} style={{ height: '100%', width: '100%' }}></div>
  );
}

Map.propTypes = {
  cityLocation: PropTypes.arrayOf(PropTypes.number),
  locations: PropTypes.arrayOf(PropTypes.shape({
    'latitude': PropTypes.number.isRequired,
    'longitude': PropTypes.number.isRequired,
    'zoom': PropTypes.number.isRequired,
  })).isRequired,
};


export default Map;
