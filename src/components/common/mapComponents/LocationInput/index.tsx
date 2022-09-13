import L, { LatLngExpression, LatLngLiteral } from 'leaflet';
import { Dispatch, SetStateAction, useRef } from 'react';
import { Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from 'antd';
import { StyledMapContainer } from './index.styled';
import mapPin from '../../../../imgs/mapPin.svg';

const LocationMarker = ({
  position,
  setPosition,
}: {
  position: LatLngExpression | null;
  setPosition: Dispatch<SetStateAction<LatLngLiteral | null>>;
}) => {
  const map = useMapEvents({
    click() {
      map.on('click', (e) => {
        setPosition(e.latlng);
      });
    },
  });

  const myIcon = L.icon({
    iconUrl: mapPin,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  return position === null ? null : (
    <Marker position={position} icon={myIcon}>
      <Popup>Bird seen here</Popup>
    </Marker>
  );
};

const LocationInput = ({
  position,
  setPosition,
}: {
  position: LatLngExpression | null;
  setPosition: Dispatch<SetStateAction<LatLngLiteral | null>>;
}) => {
  const mapRef = useRef<L.Map | null>(null);

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
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <LocationMarker position={position} setPosition={setPosition} />
    </StyledMapContainer>
  );
};

export default LocationInput;
