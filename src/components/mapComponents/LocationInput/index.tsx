import L, { LatLngExpression, LatLngLiteral } from 'leaflet';
import { Dispatch, SetStateAction, useRef } from 'react';
import { Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from 'antd';
import { StyledMapContainer, StyledMarker } from './index.styled';
import mapPin from '../../../svgs/mapPin.svg';

/**
 * The Location Marker takes a postion from the map and adds the latitude and longitude values
 *
 * the set state allows the position to be updated
 *
 *@param {Object} props
 *@param { LatLngLiteral | null} props.position the value to be initially set
 *@param {Dispatch<SetStateAction<LatLngLiteral | null>>} props.setPosition to set the state of the position if supplied
 *
 * @example <LocationMarker position={position} />
 * returns a map pin in the right position
 * @returns {React.ReactElement | null}
 */

const LocationMarker = ({
  position,
  setPosition,
}: {
  position: LatLngExpression | null;
  setPosition?: Dispatch<SetStateAction<LatLngLiteral | null>>;
}): React.ReactElement | null => {
  const map = useMapEvents({
    dblclick() {
      map.on('dblclick', (e) => {
        setPosition && setPosition(null);
      });
    },
    click() {
      map.on('click', (e) => {
        setPosition && setPosition(e.latlng);
      });
    },
  });

  const myIcon = L.icon({
    iconUrl: mapPin,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  return position === null ? null : (
    <StyledMarker position={position} icon={myIcon}>
      <Popup>Bird seen here</Popup>
    </StyledMarker>
  );
};

/**
 * The Location Input takes a point from the map and adds the latitude and longitude values
 * to inputs that are then added to the form
 *
 * the set state allows the form value to be updated
 *
 *@param {Object} props
 *@param { LatLngLiteral | null} props.position the value to be initially set
 *@param {Dispatch<SetStateAction<LatLngLiteral | null>>} props.setPosition to set the state of the position if supplied
 *
 * @example <LocationInput position={position} />
 * returns a map element with the position marked on the map
 * @returns {React.ReactElement}
 */

const LocationInput = ({
  position,
  setPosition,
}: {
  position: LatLngLiteral | null;
  setPosition?: Dispatch<SetStateAction<LatLngLiteral | null>>;
}): React.ReactElement | null => {
  const mapRef = useRef<L.Map | null>(null);

  if (setPosition) {
    const handleFindLocation = () => {
      mapRef?.current?.locate({
        setView: true,
      });

      mapRef?.current?.on('locationfound', (e) => {
        setPosition(e.latlng);
      });
    };

    return (
      <StyledMapContainer
        center={{ lat: 59.464007, lng: 10.6318 }}
        zoom={10}
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <Button
          onClick={handleFindLocation}
          style={{ zIndex: '1000', position: 'absolute', top: '5px', right: '5px' }}
        >
          My location
        </Button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </StyledMapContainer>
    );
  }

  return (
    <StyledMapContainer
      $disabled={true}
      center={{
        lat: position?.lat ? position.lat : 59.464007,
        lng: position?.lng ? position.lng : 10.6318,
      }}
      zoom={10}
      zoomControl={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      dragging={false}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org target="_blank"">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />
      <LocationMarker position={position} />
    </StyledMapContainer>
  );
};

export default LocationInput;
