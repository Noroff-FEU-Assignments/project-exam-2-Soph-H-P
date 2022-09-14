import API, {
  andFilterUnvarified,
  andSortByDate,
  includingImagesQuery,
  sightingsEndpoint,
} from '../../../constants/api';
import useSightings from '../../../hooks/useSightings';
import Loader from '../../common/Loader';
import SightingsCard from '../../common/SightingsCard';
import { StyledGridContainer } from './index.styled';

const SightingsGrid = ({ moderation }: { moderation?: boolean }) => {
  const url = API + sightingsEndpoint + includingImagesQuery + andSortByDate + andFilterUnvarified;
  const moderationUrl = API + sightingsEndpoint + includingImagesQuery + andSortByDate;
  const { sightings, error, isLoading } = useSightings(moderation ? moderationUrl : url);

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loader size={300} light={true} />;
  }

  if (sightings) {
    return (
      <StyledGridContainer $moderation={moderation}>
        {sightings &&
          sightings.map((sighting, index) => (
            <SightingsCard key={index} sighting={sighting} moderation={moderation}></SightingsCard>
          ))}
      </StyledGridContainer>
    );
  }

  return null;
};

export default SightingsGrid;
