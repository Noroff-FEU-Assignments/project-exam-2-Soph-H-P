import findTimeAgo from '../../../utils/findTimeAgo';
import useNearestLocation from '../../../hooks/useNearestLocation';
import { SightingInterface } from '../../../hooks/useSightings';
import StatusIcon from '../StatusIcon';
import { ImageWrapper, InfoWrapper, StyledCardContainer } from './index.styled';
import { useUserState } from '../../../context/UserContext';
import { Link } from 'react-router-dom';
import VarifiedUsername from '../VarifiedUsername';

const SightingsCard = ({ sighting }: { sighting: SightingInterface }) => {
  const noImage = !sighting.attributes.photos.data;
  const imageSrc = noImage ? '' : sighting.attributes.photos.data[0].attributes.url;
  const { date: when, lat, lng, species, userId } = sighting.attributes;

  const { location } = useNearestLocation(lat, lng);

  return (
    <StyledCardContainer>
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
        {location}
      </InfoWrapper>
      <InfoWrapper>
        <VarifiedUsername userId={userId} />
      </InfoWrapper>
    </StyledCardContainer>
  );
};

export default SightingsCard;
