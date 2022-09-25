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
import { message, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import useAddSightingToUser from '../../../hooks/useAddSightingToUser';
import useGetUser from '../../../hooks/useGetUser';

const ModerationSightingsCard = ({ sighting }: { sighting: SightingInterface }) => {
  const noImage = !sighting.attributes.photos.data;
  const imageSrc = noImage ? '' : sighting.attributes.photos.data[0].attributes.url;
  const imageId = noImage ? undefined : sighting.attributes.photos.data[0].id;
  const {
    date: when,
    lat,
    lng,
    species,
    username,
    userStatus,
    description,
    userId,
  } = sighting.attributes;

  const { location } = useNearestLocation(lat, lng);
  const { deleteSighting } = useDeleteSighting();
  const { varifySighting } = useVarifySighting();
  const { addSightingToUser } = useAddSightingToUser(userId);

  const getUsername = () => {
    if (username !== 'anonymous') {
      return (
        <Link to={`/admin/edit-users/${userId}`}>
          {username} <StatusIcon status={userStatus} />
        </Link>
      );
    } else {
      return username;
    }
  };

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
      <p>
        <span>Sighted by: </span>
        {getUsername()}
      </p>
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
