import { Marker, Popup, TileLayer } from 'react-leaflet';
import { StyledMapContainer } from '../LocationInput/index.styled';
import useSightings from '../../../../hooks/useSightings';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapPin from '../../../../imgs/mapPin.svg';
import findTimeAgo from '../../../../utils/findTimeAgo';
import API, {
  andFilterVarified,
  andSortByDate,
  createPastDayQuery,
  sightingsEndpoint,
} from '../../../../constants/api';
import Loader from '../../Loader';

const LocationMarker = ({
  lat,
  lng,
  species,
  date,
}: {
  lat: number;
  lng: number;
  species: string;
  date: string;
}) => {
  const myIcon = L.icon({
    iconUrl: mapPin,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -20],
  });

  const position = { lat, lng };
  const popupText = `${species} seen ${findTimeAgo(date)}`;
  return (
    <Marker position={position} icon={myIcon}>
      <Popup>{popupText}</Popup>
    </Marker>
  );
};

const MapWithLocationPoints = () => {
  const url = `${API}${sightingsEndpoint}?${andSortByDate}&${andFilterVarified}&${createPastDayQuery()}`;
  const { sightings, error, isLoading } = useSightings(url);
  if (isLoading) {
    return <Loader size={100} />;
  }

  if (error) {
    return <p>Unable to find recent sightings</p>;
  }

  return (
    <>
      <h2>Sightings in the last 24 hours</h2>
      <StyledMapContainer
        style={{ height: 400, width: '100%' }}
        center={{ lat: 59.464007, lng: 10.6318 }}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {sightings &&
          sightings.map((sighting, index) => {
            const { lat, lng, species, date } = sighting.attributes;
            return <LocationMarker key={index} lat={lat} lng={lng} species={species} date={date} />;
          })}
      </StyledMapContainer>
    </>
  );
};

export default MapWithLocationPoints;
