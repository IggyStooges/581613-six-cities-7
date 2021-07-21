import React, { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { offerProp } from '../../app/app.prop';
import { ZOOM, ICON } from '../../../const';
import {getHoverCardIndex} from '../../../store/offers/selectors';
import 'leaflet/dist/leaflet.css';

function Map({ offers, hoverCardIndex }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const locations = offers.map((offer) => ({
    location: offer.location,
    locationId: offer.id,
  }));

  const cityLocation = offers[0]?.city?.location;
  const cityLocationCoordinates = Object.values(cityLocation).slice(0, 2);

  useEffect(() => {
    const { current: mapContainer } = mapRef;

    if (mapContainer && mapInstance.current === null) {
      mapInstance.current = leaflet.map(mapContainer, {
        center: cityLocationCoordinates,
        zoom: cityLocation?.zoom,
        zoomControl: false,
        marker: true,
      });

      leaflet
        .tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        })
        .addTo(mapInstance.current);
    }

    return () => {
      mapInstance.current.remove();
    };

  }, []);

  useEffect(() => {
    if (!mapInstance.current) {
      return;
    }

    const { current: instance } = mapInstance;

    const iconsGroup = leaflet.layerGroup().addTo(instance);

    locations?.forEach(({location, locationId}) => {
      const isActiveIcon = hoverCardIndex === locationId;
      const activeIcon = leaflet.icon({
        iconUrl: ICON.activeIconUrl,
        iconSize: ICON.iconSize,
      });
      const defaultIcon = leaflet.icon({
        iconUrl: ICON.iconUrl,
        iconSize: ICON.iconSize,
      });

      leaflet
        .marker({
          lat: location?.latitude,
          lng: location?.longitude,
        }, {icon: isActiveIcon ? activeIcon : defaultIcon})
        .addTo(iconsGroup);
    });

    instance.setView(cityLocationCoordinates, ZOOM);

    return () => {
      iconsGroup.clearLayers();
    };

  }, [hoverCardIndex, offers, cityLocationCoordinates]);

  return (
    <div ref={mapRef} style={{ height: '100%', width: '100%' }}></div>
  );
}

Map.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
  hoverCardIndex: PropTypes.number,
};

const mapStateToProps = (state) => ({
  hoverCardIndex: getHoverCardIndex(state),
});

export { Map };
export default connect(mapStateToProps, null)(Map);
