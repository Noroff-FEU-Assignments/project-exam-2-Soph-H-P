import useSightings from '../../../hooks/useSightings';
import Loader from '../../common/Loader';
import SightingsCard from '../../common/SightingsCard';
import { StyledGridContainer } from './index.styled';

const SightingsGrid = () => {
  const { sightings, error, isLoading } = useSightings();

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
          sightings.map((sighting) => <SightingsCard sighting={sighting}></SightingsCard>)}
      </StyledGridContainer>
    );
  }

  return null;
};

export default SightingsGrid;
