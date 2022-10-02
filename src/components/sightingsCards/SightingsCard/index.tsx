import { useNavigate } from 'react-router-dom';

import { SightingInterface } from '../../../hooks/useSightings';
import findImageUrl from '../../../utils/findImageUrl';
import findTimeAgo from '../../../utils/findTimeAgo';
import ImageWithWrapper from '../../common/ImageWithWrapper';
import MembersOnly from '../MembersOnly';
import VarifiedUsername from '../VarifiedUsername';
import { InfoWrapper, StyledCardContainer } from './index.styled';

/**
 * Creates a card that shows a sighting
 *
 * @param {Object} props
 * @param {boolean} props.sighting the sighting that should be on the card
 * @example <SightingsCard sighting={sighting} />
 * @returns {React.ReactElement}
 */

const SightingsCard = ({
  sighting,
}: {
  sighting: SightingInterface;
}): React.ReactElement => {
  const {
    date: when,
    nearestLocation,
    species,
    profileId,
    username,
    varified,
    public: isPublic,
  } = sighting.attributes;
  const navigate = useNavigate();

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
        <VarifiedUsername profileId={profileId} backupUsername={username} />
      </InfoWrapper>
      {!isPublic && <MembersOnly />}
    </StyledCardContainer>
  );
};

export default SightingsCard;
