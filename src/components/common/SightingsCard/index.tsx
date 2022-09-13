import findTimeAgo from '../../../utils/findTimeAgo';
import useNearestLocation from '../../../hooks/useNearestLocation';
import { SightingInterface } from '../../../hooks/useSightings';
import StatusIcon from '../StatusIcon';
import { ImageWrapper, StyledCardContainer } from './index.styled';

const SightingsCard = ({ sighting }: { sighting: SightingInterface }) => {
  const imageSrc = sighting.attributes.photos.data[0].attributes.url;
  const { date: when, lat, lng, species, username, userStatus } = sighting.attributes;

  const { location } = useNearestLocation(lat, lng);

  return (
    <StyledCardContainer>
      <ImageWrapper $height={200}>
        <img src={imageSrc} alt={species} />
      </ImageWrapper>
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
    </StyledCardContainer>
  );
};

export default SightingsCard;
