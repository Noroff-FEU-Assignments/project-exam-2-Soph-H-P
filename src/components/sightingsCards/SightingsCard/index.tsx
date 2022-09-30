import findTimeAgo from '../../../utils/findTimeAgo';
import { SightingInterface } from '../../../hooks/useSightings';
import { InfoWrapper, StyledCardContainer } from './index.styled';
import VarifiedUsername from '../VarifiedUsername';
import { useNavigate } from 'react-router-dom';
import MembersOnly from '../MembersOnly';
import ImageWithWrapper from '../../common/ImageWithWrapper';

/**
 * Creates a card that shows a sighting
 *
 * @param {Object} props
 * @param {boolean} props.sighting the sighting that should be on the card
 * @example <SightingsCard sighting={sighting} />
 * @returns {React.ReactElement}
 */

const SightingsCard = ({ sighting }: { sighting: SightingInterface }): React.ReactElement => {
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

  const findImageUrl = (sighting: SightingInterface) => {
    if (sighting.attributes.photos.data) {
      if (sighting.attributes.photos.data[0].attributes.formats.small) {
        return sighting.attributes.photos.data[0].attributes.formats.small.url;
      }
      return sighting.attributes.photos.data[0].attributes.url;
    } else {
      return '';
    }
  };

  findImageUrl(sighting);
  const imageSrc = findImageUrl(sighting);
  const noImage = imageSrc === '';

  return (
    <StyledCardContainer
      $isVarified={varified}
      onClick={() => navigate(`/sighting/${sighting.id}`)}
    >
      <ImageWithWrapper
        height="160px"
        width="100%"
        noImage={noImage}
        src={imageSrc}
        alt={species}
      />
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
