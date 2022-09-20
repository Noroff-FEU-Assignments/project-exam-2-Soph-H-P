import findTimeAgo from '../../../utils/findTimeAgo';
import useNearestLocation from '../../../hooks/useNearestLocation';
import { SightingInterface } from '../../../hooks/useSightings';
import StatusIcon from '../StatusIcon';
import { ImageWrapper, SplitCard, StyledCardContainer } from './index.styled';
import MapWithLocationPoints from '../mapComponents/MapWithLocationPoints';

const SingleSightingCard = ({ sighting }: { sighting: SightingInterface }) => {
  const noImage = !sighting.attributes.photos.data;
  const imageSrc = noImage ? '' : sighting.attributes.photos.data[0].attributes.url;
  const { date: when, lat, lng, species, username, userStatus, description } = sighting.attributes;

  const { location } = useNearestLocation(lat, lng);
  return (
    <StyledCardContainer>
      <ImageWrapper $height={400} $noImage={noImage}>
        <img src={imageSrc} alt={species} />
      </ImageWrapper>
      <SplitCard>
        <div>
          <h2>{species}</h2>
          <p>
            <span>Sighted: </span>
            {findTimeAgo(when)}
          </p>
          <p>
            <span>Where: </span>
            {location}
          </p>
          <p>
            <span>Sighted by: </span>
            {username}
            {username !== 'anonymous' && <StatusIcon status={userStatus} />}
          </p>
          <p>
            <span>Description: </span>
            {description}
          </p>
        </div>
        <MapWithLocationPoints
          height={200}
          singleLat={lat}
          singleLng={lng}
          singleSpecies={species}
          singleDate={when}
          sightingId={sighting.id}
        />
      </SplitCard>
    </StyledCardContainer>
  );
};

export default SingleSightingCard;
