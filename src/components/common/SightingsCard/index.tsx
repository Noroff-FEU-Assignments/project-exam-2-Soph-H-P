import findTimeAgo from '../../../utils/findTimeAgo';
import useNearestLocation from '../../../hooks/useNearestLocation';
import { SightingInterface } from '../../../hooks/useSightings';
import StatusIcon from '../StatusIcon';
import { ImageWrapper, StyledCardContainer } from './index.styled';
import { useUserState } from '../../../context/UserContext';
import { Link } from 'react-router-dom';

const SightingsCard = ({ sighting }: { sighting: SightingInterface }) => {
  const noImage = !sighting.attributes.photos.data;
  const imageSrc = noImage ? '' : sighting.attributes.photos.data[0].attributes.url;
  const { date: when, lat, lng, species, username, userStatus, userId } = sighting.attributes;
  const { userInfo } = useUserState();
  const { location } = useNearestLocation(lat, lng);

  const getUsername = () => {
    if (username !== 'anonymous' && userInfo?.userRole === 'admin') {
      return (
        <Link to={`/admin/edit-users/${userId}`}>
          {username} <StatusIcon status={userStatus} />
        </Link>
      );
    } else {
      return username;
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
    </StyledCardContainer>
  );
};

export default SightingsCard;
