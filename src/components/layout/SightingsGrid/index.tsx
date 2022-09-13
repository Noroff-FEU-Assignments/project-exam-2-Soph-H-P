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

const SightingsGrid = () => {
  const url = API + sightingsEndpoint + includingImagesQuery + andSortByDate + andFilterUnvarified;
  const { sightings, error, isLoading } = useSightings(url);

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loader size={400} light={true} />;
  }

  if (sightings) {
    return (
      <StyledGridContainer>
        {sightings &&
          sightings.map((sighting, index) => (
            <SightingsCard key={index} sighting={sighting}></SightingsCard>
          ))}
      </StyledGridContainer>
    );
  }

  return null;
};

export default SightingsGrid;
