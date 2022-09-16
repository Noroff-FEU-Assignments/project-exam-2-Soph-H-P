import { Popup, TileLayer } from 'react-leaflet';
import { StyledMapContainer, StyledMarker } from '../LocationInput/index.styled';
import useSightings from '../../../../hooks/useSightings';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapPin from '../../../../svgs/mapPin.svg';
import findTimeAgo from '../../../../utils/findTimeAgo';
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
    <StyledMarker position={position} icon={myIcon}>
      <Popup>{popupText}</Popup>
    </StyledMarker>
  );
};

const MapWithLocationPoints = ({
  height,
  url,
  title,
  singleLat,
  singleLng,
  singleSpecies,
  singleDate,
}: {
  height: number | string;
  url?: string;
  title?: string;
  singleLat?: number;
  singleLng?: number;
  singleSpecies?: string;
  singleDate?: string;
}) => {
  const { sightings, error, isLoading } = useSightings(url);

  if (isLoading && url) {
    return <Loader size={100} />;
  }

  if (error) {
    return <p>Unable to find recent sightings</p>;
  }

  if (url) {
    return (
      <>
        {title && <h2>{title}</h2>}
        <StyledMapContainer
          style={{ height: height, width: '100%' }}
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
              return (
                <LocationMarker key={index} lat={lat} lng={lng} species={species} date={date} />
              );
            })}
        </StyledMapContainer>
      </>
    );
  }
  if (singleLat && singleLng && singleSpecies && singleDate) {
    return (
      <StyledMapContainer
        style={{ height: height, width: '100%' }}
        center={{ lat: singleLat, lng: singleLng }}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <LocationMarker lat={singleLat} lng={singleLng} species={singleSpecies} date={singleDate} />
      </StyledMapContainer>
    );
  }

  return (
    <StyledMapContainer
      style={{ height: height, width: '100%' }}
      center={{ lat: 59.464007, lng: 10.6318 }}
      zoom={10}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
    </StyledMapContainer>
  );
};

export default MapWithLocationPoints;
