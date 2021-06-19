import React, { useEffect, useRef, useState } from 'react';
import leaflet from 'leaflet';
import PropTypes from 'prop-types';
import { offerProp } from '../../app/app.prop';
import { ZOOM, ICON } from '../../../const';
import 'leaflet/dist/leaflet.css';

const icon = leaflet.icon({
  iconUrl: ICON.iconUrl,
  iconSize: ICON.iconSize,
});

function Map({ cityLocation, offers }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const locations = offers.map((offer) => offer.location);
  const cityLocationCoordinates = Object.values(cityLocation).slice(0, 2);

  useEffect(() => {
    map && map.remove();
    setMap(null);
  }, [cityLocation, offers]);

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

      leaflet
        .marker(cityLocationCoordinates, { icon })
        .addTo(instance);

      locations.forEach((location) => {
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
};

export default Map;
