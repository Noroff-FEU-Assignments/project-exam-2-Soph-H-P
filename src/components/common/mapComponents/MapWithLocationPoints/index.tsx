import { TileLayer } from 'react-leaflet';
import { StyledMapContainer, StyledMarker, StyledPopup } from '../LocationInput/index.styled';
import useSightings from '../../../../hooks/useSightings';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapPin from '../../../../svgs/mapPin.svg';
import findTimeAgo from '../../../../utils/findTimeAgo';
import Loader from '../../Loader';
import { Link } from 'react-router-dom';
import ApiErrorMessage from '../../ApiErrorMessage';

const PopupText = ({
  species,
  date,
  sightingId,
}: {
  species: string;
  date: string;
  sightingId: number;
}) => {
  return (
    <StyledPopup>
      <Link to={`/sighting/${sightingId}`}>{species}</Link>
      <p>Last seen {findTimeAgo(date)}</p>
    </StyledPopup>
  );
};

const LocationMarker = ({
  lat,
  lng,
  species,
  date,
  sightingId,
}: {
  lat: number;
  lng: number;
  species: string;
  date: string;
  sightingId: number;
}) => {
  const myIcon = L.icon({
    iconUrl: mapPin,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -20],
  });

  const position = { lat, lng };
  return (
    <StyledMarker position={position} icon={myIcon}>
      <PopupText species={species} date={date} sightingId={sightingId} />
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
  sightingId,
}: {
  height: number | string;
  url?: string;
  title?: string;
  singleLat?: number;
  singleLng?: number;
  singleSpecies?: string;
  singleDate?: string;
  sightingId?: number;
}) => {
  const { sightings, error, isLoading } = useSightings(url);

  if (isLoading && url) {
    return <Loader size={100} />;
  }

  if (error) {
    return <ApiErrorMessage message="Oops something went wrong. Unable to find recent sightings" />;
  }

  if (url) {
    return (
      <>
        {title && <h2>{title}</h2>}
        <StyledMapContainer
          style={{ height: height, width: '100%' }}
          center={{ lat: 59.446820, lng: 11.167907 }}
          zoom={9}
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
                <LocationMarker
                  key={index}
                  lat={lat}
                  lng={lng}
                  species={species}
                  date={date}
                  sightingId={sighting.id}
                />
              );
            })}
        </StyledMapContainer>
      </>
    );
  }
  if (singleLat && singleLng && singleSpecies && singleDate && sightingId) {
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
        <LocationMarker
          lat={singleLat}
          lng={singleLng}
          species={singleSpecies}
          date={singleDate}
          sightingId={sightingId}
        />
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
