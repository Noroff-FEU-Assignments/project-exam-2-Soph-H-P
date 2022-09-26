import findTimeAgo from '../../../utils/findTimeAgo';
import useNearestLocation from '../../../hooks/useNearestLocation';
import { SightingInterface } from '../../../hooks/useSightings';
import { ButtonContainer, ImageWrapper, InfoWrapper, StyledCardContainer } from './index.styled';
import theme from '../../../styles/theme';
import CheckSvg from '../../../svgs/CheckSvg';
import RoundButton from '../buttons/RoundButton';
import CloseSvg from '../../../svgs/CloseSvg';
import useDeleteSighting from '../../../hooks/useDeleteSighting';
import useVarifySighting from '../../../hooks/useVarifySighting';
import { message, Popconfirm } from 'antd';
import useAddSightingToUser from '../../../hooks/useAddSightingToUser';
import VarifiedUsername from '../VarifiedUsername';

const ModerationSightingsCard = ({ sighting }: { sighting: SightingInterface }) => {
  const noImage = !sighting.attributes.photos.data;
  const imageSrc = noImage ? '' : sighting.attributes.photos.data[0].attributes.url;
  const imageId = noImage ? undefined : sighting.attributes.photos.data[0].id;
  const { date: when, lat, lng, species, description, userId } = sighting.attributes;

  const { location } = useNearestLocation(lat, lng);
  const { deleteSighting } = useDeleteSighting();
  const { varifySighting } = useVarifySighting();
  const { addSightingToUser } = useAddSightingToUser(userId);

  const text = 'Are you sure you want to delete this sighting?';

  const confirm = () => {
    message.info('Sighting deleted');
    deleteSighting(sighting.id, imageId);
  };

  const handleVarifySighting = () => {
    varifySighting(sighting.id);
    if (userId !== null) {
      addSightingToUser(userId);
    }
  };

  return (
    <StyledCardContainer>
      <ImageWrapper $height={160} $noImage={noImage}>
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
      <InfoWrapper>
        <VarifiedUsername userId={userId} />
      </InfoWrapper>
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
            onClick={handleVarifySighting}
          />
          <Popconfirm placement="top" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
            <RoundButton
              type="primary"
              icon={<CloseSvg />}
              color={theme.colors.errorColor}
              danger={true}
            />
          </Popconfirm>
        </ButtonContainer>
      </>
    </StyledCardContainer>
  );
};

export default ModerationSightingsCard;
