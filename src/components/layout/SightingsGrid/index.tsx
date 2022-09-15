import API, {
  andFilterUnvarified,
  andFilterVarified,
  andSortByDate,
  includingImagesQuery,
  sightingsEndpoint,
} from '../../../constants/api';
import useSightings from '../../../hooks/useSightings';
import Loader from '../../common/Loader';
import SightingsCard from '../../common/SightingsCard';
import { StyledGridContainer } from './index.styled';

const SightingsGrid = ({ moderation }: { moderation?: boolean }) => {
  const url = `${API}${sightingsEndpoint}?${includingImagesQuery}&${andSortByDate}&${andFilterVarified}`;
  const moderationUrl = `${API}${sightingsEndpoint}?${includingImagesQuery}&${andSortByDate}&${andFilterUnvarified}`;
  const { sightings, error, isLoading } = useSightings(moderation ? moderationUrl : url);

  if (error) {
    return (
      <StyledGridContainer $moderation={moderation}>
        <p>{error}</p>
      </StyledGridContainer>
    );
  }

  if (isLoading) {
    return (
      <StyledGridContainer $moderation={moderation}>
        <Loader size={300} light={true} />
      </StyledGridContainer>
    );
  }

  if (sightings && sightings.length <= 0) {
    return (
      <StyledGridContainer $moderation={moderation}>
        <p>
          {moderation
            ? 'There are no sightings to moderate at the moment.'
            : "There aren't any sightings yet."}
        </p>
      </StyledGridContainer>
    );
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
