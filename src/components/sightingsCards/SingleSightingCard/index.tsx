import findTimeAgo from '../../../utils/findTimeAgo';
import { SightingInterface } from '../../../hooks/useSightings';
import { InfoWrapper, SplitCard, StyledCardContainer } from './index.styled';
import MapWithLocationPoints from '../../mapComponents/MapWithLocationPoints';
import VarifiedUsername from '../VarifiedUsername';
import RoundButton from '../../common/buttons/RoundButton';
import EditSvg from '../../../svgs/EditSvg';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../../../context/UserContext';
import { useEffect } from 'react';
import MembersOnly from '../MembersOnly';
import ImageWithWrapper from '../../common/ImageWithWrapper';

const SingleSightingCard = ({ sighting }: { sighting: SightingInterface }) => {
  const { userInfo } = useUserState();
  const noImage = !sighting.attributes.photos.data;
  const imageSrc = noImage ? '' : sighting.attributes.photos.data[0].attributes.url;
  const {
    date: when,
    lat,
    lng,
    nearestLocation,
    species,
    userId,
    description,
    username,
    varified,
    public: isPublic,
  } = sighting.attributes;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      if (userInfo.userRole === 'admin' || parseInt(userId) === userInfo.id) {
        return;
      } else {
        navigate('/');
      }
    }
    navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, userInfo]);

  return (
    <StyledCardContainer $isVarified={varified}>
      <ImageWithWrapper
        height="480px"
        width="100%"
        noImage={noImage}
        src={imageSrc}
        alt={species}
      />
      <SplitCard>
        <div>
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
          <p style={{ alignItems: 'start', flexDirection: 'column' }}>
            <span>Description: </span>
            {description}
          </p>
        </div>
        <MapWithLocationPoints
          height={'250px'}
          singleLat={lat}
          singleLng={lng}
          singleSpecies={species}
          singleDate={when}
          sightingId={sighting.id}
        />
      </SplitCard>
      {userInfo?.userRole === 'admin' && (
        <RoundButton
          type="primary"
          icon={<EditSvg />}
          onClick={() => navigate(`/admin/edit-sighting/${sighting.id}`)}
        />
      )}
      {!isPublic && <MembersOnly isLongView={true} />}
    </StyledCardContainer>
  );
};

export default SingleSightingCard;
