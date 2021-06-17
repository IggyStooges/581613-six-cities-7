import React, { useEffect, useRef, useState } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import { offerProp } from '../../app/app.prop';
import sortByCity from '../../../utils/sortByCity';
import { ZOOM, ICON } from '../../../const';

const icon = leaflet.icon({
  iconUrl: ICON.iconUrl,
  iconSize: ICON.iconSize,
});

const offerCords = [52.3709553943508, 4.89309666406198];

function Map({ offers }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  const sortedOffers = sortByCity(offers);
  const currentCity = sortedOffers['Amsterdam'];
  const { location: cityLocation, offers: currentCityOffers } = currentCity;
  const locations = currentCityOffers.map((offer) => offer.location);
  const cityLocationCoordinates = Object.values(cityLocation).slice(0, 2);

  useEffect(() => {
    const { current: mapContainer } = mapRef;

    if (mapContainer && map === null) {
      const instance = leaflet.map(mapContainer, {
        center: cityLocationCoordinates,
        zoom: ZOOM,
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
        .marker(offerCords, { icon })
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
  }, [locations, mapRef, map]);

  return (
    <div ref={mapRef} style={{ height: '100%', width: '100%' }}></div>
  );
}

Map.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
};


export default Map;
