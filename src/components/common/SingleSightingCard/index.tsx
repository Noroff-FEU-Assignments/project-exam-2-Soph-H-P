import findTimeAgo from '../../../utils/findTimeAgo';
import useNearestLocation from '../../../hooks/useNearestLocation';
import { SightingInterface } from '../../../hooks/useSightings';
import { ImageWrapper, SplitCard, StyledCardContainer } from './index.styled';
import MapWithLocationPoints from '../mapComponents/MapWithLocationPoints';
import VarifiedUsername from '../VarifiedUsername';

const Card = ({ sighting }: { sighting: SightingInterface }) => {
  const noImage = !sighting.attributes.photos.data;
  const imageSrc = noImage ? '' : sighting.attributes.photos.data[0].attributes.url;
  const { date: when, lat, lng, species, userId, description } = sighting.attributes;

  const { location } = useNearestLocation(lat, lng);
  return (
    <StyledCardContainer>
      <ImageWrapper $height={480} $noImage={noImage}>
        <img src={imageSrc} alt={species} />
      </ImageWrapper>
      <SplitCard>
        <div>
          <h2>{species}</h2>
          <p>
            <span>Sighted: </span>
            {findTimeAgo(when)}
          </p>
          <p>
            <span>Where: </span>
            {location}
          </p>
          <div>
            <span>Sighted by: </span>
            <VarifiedUsername userId={userId} />
          </div>
          <p>
            <span>Description: </span>
            {description}
          </p>
        </div>
        <MapWithLocationPoints
          height={200}
          singleLat={lat}
          singleLng={lng}
          singleSpecies={species}
          singleDate={when}
          sightingId={sighting.id}
        />
      </SplitCard>
    </StyledCardContainer>
  );
};

export default Card;
