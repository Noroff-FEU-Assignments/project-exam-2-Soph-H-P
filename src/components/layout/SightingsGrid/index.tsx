import { Link } from 'react-router-dom';
import API, {
  andFilterPublicOnly,
  andFilterUnvarified,
  andFilterVarified,
  andSortByDate,
  includingImagesQuery,
  sightingsEndpoint,
} from '../../../constants/api';
import { UserInterface, useUserState } from '../../../context/UserContext';
import useSightings from '../../../hooks/useSightings';
import Loader from '../../common/Loader';
import SightingsCard from '../../common/SightingsCard';
import { StyledGridContainer } from './index.styled';

const SightingsGrid = ({ moderation }: { moderation?: boolean }) => {
  const { userInfo } = useUserState();

  const findUrl = (userInfo: Partial<UserInterface | null>) => {
    if (!userInfo) {
      return `${API}${sightingsEndpoint}?${includingImagesQuery}&${andSortByDate}&${andFilterVarified}&${andFilterPublicOnly}`;
    }
    return `${API}${sightingsEndpoint}?${includingImagesQuery}&${andSortByDate}&${andFilterVarified}`;
  };

  const foundUrl = findUrl(userInfo);
  const moderationUrl = `${API}${sightingsEndpoint}?${includingImagesQuery}&${andSortByDate}&${andFilterUnvarified}`;
  const { sightings, error, isLoading } = useSightings(moderation ? moderationUrl : foundUrl);

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

  if (sightings && sightings.length >= 1) {
    return (
      <StyledGridContainer $moderation={moderation}>
        {sightings &&
          moderation &&
          sightings.map((sighting, index) => (
            <SightingsCard key={index} sighting={sighting} moderation={moderation}></SightingsCard>
          ))}
        {sightings &&
          !moderation &&
          sightings.map((sighting, index) => (
            <Link to={`/sighting/${sighting.id}`}>
              <SightingsCard
                key={index}
                sighting={sighting}
                moderation={moderation}
              ></SightingsCard>
            </Link>
          ))}
      </StyledGridContainer>
    );
  }

  return null;
};

export default SightingsGrid;
