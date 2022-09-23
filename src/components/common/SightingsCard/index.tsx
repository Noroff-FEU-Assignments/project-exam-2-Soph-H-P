import findTimeAgo from '../../../utils/findTimeAgo';
import useNearestLocation from '../../../hooks/useNearestLocation';
import { SightingInterface } from '../../../hooks/useSightings';
import StatusIcon from '../StatusIcon';
import { ButtonContainer, ImageWrapper, StyledCardContainer } from './index.styled';
import theme from '../../../styles/theme';
import CheckSvg from '../../../svgs/CheckSvg';
import RoundButton from '../buttons/RoundButton';
import CloseSvg from '../../../svgs/CloseSvg';
import useDeleteSighting from '../../../hooks/useDeleteSighting';
import useVarifySighting from '../../../hooks/useVarifySighting';

const SightingsCard = ({
  sighting,
  moderation,
}: {
  sighting: SightingInterface;
  moderation?: boolean;
}) => {
  const noImage = !sighting.attributes.photos.data;
  const imageSrc = noImage ? '' : sighting.attributes.photos.data[0].attributes.url;
  const imageId = noImage ? undefined : sighting.attributes.photos.data[0].id;
  const { date: when, lat, lng, species, username, userStatus, description } = sighting.attributes;

  const { location } = useNearestLocation(lat, lng);
  const { deleteSighting } = useDeleteSighting();
  const { varifySighting } = useVarifySighting();
  return (
    <StyledCardContainer>
      <ImageWrapper $height={150} $noImage={noImage}>
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
      {moderation && (
        <>
          <p style={{ alignItems: 'start', flexDirection: 'column' }}>
            <span>Description: </span>
            {description}
          </p>
          <ButtonContainer>
            <RoundButton
              type="primary"
              icon={<CheckSvg />}
              color={theme.colors.secondaryColor}
              onClick={() => {
                varifySighting(sighting.id);
              }}
            />
            <RoundButton
              type="primary"
              icon={<CloseSvg />}
              onClick={() => {
                deleteSighting(sighting.id, imageId);
              }}
              color={theme.colors.errorColor}
              danger={true}
            />
          </ButtonContainer>
        </>
      )}
    </StyledCardContainer>
  );
};

export default SightingsCard;
