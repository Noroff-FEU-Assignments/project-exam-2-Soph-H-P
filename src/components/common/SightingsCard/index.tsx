import findTimeAgo from '../../../utils/findTimeAgo';
import { SightingInterface } from '../../../hooks/useSightings';
import { ImageWrapper, InfoWrapper, StyledCardContainer } from './index.styled';
import VarifiedUsername from '../VarifiedUsername';
import { Link } from 'react-router-dom';

const SightingsCard = ({ sighting }: { sighting: SightingInterface }) => {
  const noImage = !sighting.attributes.photos.data;
  const imageSrc = noImage ? '' : sighting.attributes.photos.data[0].attributes.url;
  const { date: when, nearestLocation, species, userId, username } = sighting.attributes;

  return (
    <StyledCardContainer>
      <Link to={`/sighting/${sighting.id}`}>
        <ImageWrapper $height={160} $noImage={noImage}>
          <img src={imageSrc} alt={species} />
        </ImageWrapper>
        <h2>{species}</h2>
        <InfoWrapper>
          <span>Sighted: </span>
          {findTimeAgo(when)}
        </InfoWrapper>
        <InfoWrapper>
          <span>Where: </span>
          {nearestLocation}
        </InfoWrapper>
        <InfoWrapper>
          <VarifiedUsername userId={userId} backupUsername={username} />
        </InfoWrapper>
      </Link>
    </StyledCardContainer>
  );
};

export default SightingsCard;
