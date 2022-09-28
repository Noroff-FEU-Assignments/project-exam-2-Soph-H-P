import findTimeAgo from '../../../utils/findTimeAgo';
import { SightingInterface } from '../../../hooks/useSightings';
import { ButtonContainer, InfoWrapper, StyledCardContainer } from './index.styled';
import theme from '../../../styles/theme';
import CheckSvg from '../../../svgs/CheckSvg';
import RoundButton from '../../common/buttons/RoundButton';
import CloseSvg from '../../../svgs/CloseSvg';
import useDeleteSighting from '../../../hooks/useDeleteSighting';
import useVarifySighting from '../../../hooks/useVarifySighting';
import { message, Popconfirm } from 'antd';
import useAddSightingToUser from '../../../hooks/useAddSightingToUser';
import VarifiedUsername from '../VarifiedUsername';
import EditSvg from '../../../svgs/EditSvg';
import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';
import MembersOnly from '../MembersOnly';
import ImageWithWrapper from '../../common/ImageWithWrapper';

const ModerationSightingsCard = ({
  sighting,
  setVisibleSightings,
}: {
  sighting: SightingInterface;
  setVisibleSightings: Dispatch<SetStateAction<SightingInterface[] | null>>;
}) => {
  const noImage = !sighting.attributes.photos.data;
  const imageSrc = noImage ? '' : sighting.attributes.photos.data[0].attributes.formats.small.url;
  const imageId = noImage ? undefined : sighting.attributes.photos.data[0].id;
  const {
    date: when,
    nearestLocation,
    species,
    description,
    userId,
    username,
    public: isPublic,
  } = sighting.attributes;
  const navigate = useNavigate();
  const { deleteSighting } = useDeleteSighting();
  const { varifySighting } = useVarifySighting();
  const { addSightingToUser } = useAddSightingToUser();

  const text = 'Are you sure you want to delete this sighting?';

  const removeSighting = (id: number) => {
    setVisibleSightings((currentSightings) => {
      return currentSightings?.filter((sighting) => sighting.id !== id) || null;
    });
  };

  const confirm = () => {
    message.info('Sighting deleted');
    deleteSighting(sighting.id, imageId);
    removeSighting(sighting.id);
  };

  const handleVarifySighting = () => {
    varifySighting(sighting.id);
    if (userId !== null) {
      addSightingToUser(userId);
    }
    removeSighting(sighting.id);
  };

  return (
    <StyledCardContainer>
      <ImageWithWrapper height="160px" width="100%" noImage={noImage} src={imageSrc} alt={species}/>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>{species}</h2>
        <RoundButton
          type="primary"
          icon={<EditSvg />}
          onClick={() => navigate(`/admin/edit-sighting/${sighting.id}`)}
        />
      </div>
      <p>
        <span>When: </span>
        {findTimeAgo(when)}
      </p>
      <p>
        <span>Where: </span>
        {nearestLocation}
      </p>
      <InfoWrapper>
        <VarifiedUsername userId={userId} backupUsername={username} />
      </InfoWrapper>
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
        <Popconfirm
          placement="top"
          title={text}
          onConfirm={confirm}
          okText="Delete sighting"
          cancelText="Cancel"
        >
          <RoundButton
            type="primary"
            icon={<CloseSvg />}
            color={theme.colors.errorColor}
            danger={true}
          />
        </Popconfirm>
      </ButtonContainer>
      {!isPublic && <MembersOnly />}
    </StyledCardContainer>
  );
};

export default ModerationSightingsCard;
