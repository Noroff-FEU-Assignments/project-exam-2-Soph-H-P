import findTimeAgo from '../../../utils/findTimeAgo';
import { SightingInterface } from '../../../hooks/useSightings';
import { ImageWrapper, InfoWrapper, SplitCard, StyledCardContainer } from './index.styled';
import MapWithLocationPoints from '../mapComponents/MapWithLocationPoints';
import VarifiedUsername from '../VarifiedUsername';
import RoundButton from '../buttons/RoundButton';
import EditSvg from '../../../svgs/EditSvg';
import { useNavigate } from 'react-router-dom';

const Card = ({ sighting }: { sighting: SightingInterface }) => {
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
  } = sighting.attributes;

  const navigate = useNavigate();
  

  return (
    <StyledCardContainer>
      <ImageWrapper $height={480} $noImage={noImage}>
        <img src={imageSrc} alt={species} />
      </ImageWrapper>
      <SplitCard>
        <div>
          <h2>{species}</h2>
          <InfoWrapper>
            <span>Sighted: </span>
            {findTimeAgo(when)}
          </InfoWrapper>
          <InfoWrapper>
            <span>Where: </span>
            {nearestLocation}
          </InfoWrapper>
          <InfoWrapper>
            <VarifiedUsername userId={userId} backupUsername={username} />
          </InfoWrapper>
          <p  style={{ alignItems: 'start', flexDirection: 'column' }}>
            <span>Description: </span>
            {description}
          </p>
        </div>
        <MapWithLocationPoints
          height={'100%'}
          singleLat={lat}
          singleLng={lng}
          singleSpecies={species}
          singleDate={when}
          sightingId={sighting.id}
        />
      </SplitCard>
      <RoundButton
        type="primary"
        icon={<EditSvg />}
        onClick={() => navigate(`/admin/edit-sighting/${sighting.id}`)}
      />
    </StyledCardContainer>
  );
};

export default Card;
