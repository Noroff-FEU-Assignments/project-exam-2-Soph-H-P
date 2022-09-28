import findTimeAgo from '../../../utils/findTimeAgo';
import { SightingInterface } from '../../../hooks/useSightings';
import { ImageWrapper, InfoWrapper, StyledCardContainer } from './index.styled';
import VarifiedUsername from '../VarifiedUsername';
import { useNavigate } from 'react-router-dom';
import MembersOnly from '../MembersOnly';

const SightingsCard = ({ sighting }: { sighting: SightingInterface }) => {
  const noImage = !sighting.attributes.photos.data;
  const imageSrc = noImage ? '' : sighting.attributes.photos.data[0].attributes.url;
  const {
    date: when,
    nearestLocation,
    species,
    userId,
    username,
    varified,
    public: isPublic,
  } = sighting.attributes;

  const navigate = useNavigate();

  return (
    <StyledCardContainer
      $isVarified={varified}
      onClick={() => navigate(`/sighting/${sighting.id}`)}
    >
      <ImageWrapper $height={160} $noImage={noImage}>
        <img src={imageSrc} alt={species} />
      </ImageWrapper>
      <h2>{species}</h2>
      <InfoWrapper>
        <span>When: </span>
        {findTimeAgo(when)}
      </InfoWrapper>
      <InfoWrapper>
        <span>Where: </span>
        {nearestLocation}
      </InfoWrapper>
      <InfoWrapper>
        <VarifiedUsername userId={userId} backupUsername={username} />
      </InfoWrapper>
      {!isPublic && <MembersOnly />}
    </StyledCardContainer>
  );
};

export default SightingsCard;
