import React, { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CITY, ZOOM, ICON } from '../../../../const';

const icon = leaflet.icon({
  iconUrl: ICON.iconUrl,
  iconSize: ICON.iconSize,
});
const offerCords = [52.3709553943508, 4.89309666406198];

function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    const { current: mapContainer } = mapRef;
    const map = leaflet.map(mapContainer, {
      center: CITY,
      zoom: ZOOM,
      zoomControl: false,
      marker: true,
    });

    leaflet
      .tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      })
      .addTo(map);

    map.setView(CITY, ZOOM);

    leaflet
      .marker(offerCords, { icon })
      .addTo(map);
  });

  return (
    <div ref={mapRef} style={{height: '100%'}}></div>
  );
}

export default Map;
