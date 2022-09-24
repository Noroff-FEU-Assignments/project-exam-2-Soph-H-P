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
import createMySightingsEndpoint from '../../../utils/createMySightingsEndpoint';
import ApiErrorMessage from '../../common/ApiErrorMessage';
import Loader from '../../common/Loader';
import SightingsCard from '../../common/SightingsCard';
import PageTitle from '../../common/typography/PageTitle';
import { SightingsContainer, StyledGridContainer } from './index.styled';

const SightingsGrid = ({
  title,
  moderation,
  mySightings,
}: {
  title: string;
  moderation?: boolean;
  mySightings?: boolean;
}) => {
  const { userInfo } = useUserState();

  const findUrl = (userInfo: Partial<UserInterface | null>) => {
    if (!userInfo) {
      return `${API}${sightingsEndpoint}?${includingImagesQuery}&${andSortByDate}&${andFilterVarified}&${andFilterPublicOnly}`;
    }
    return `${API}${sightingsEndpoint}?${includingImagesQuery}&${andSortByDate}&${andFilterVarified}`;
  };

  const findMySightingsUrl = () => {
    if (userInfo?.id) {
      return `${API}${sightingsEndpoint}?${includingImagesQuery}&${andSortByDate}&${andFilterVarified}&${createMySightingsEndpoint(
        userInfo.id
      )}`;
    }
  };

  const foundUrl = findUrl(userInfo);
  const moderationUrl = `${API}${sightingsEndpoint}?${includingImagesQuery}&${andSortByDate}&${andFilterUnvarified}`;
  const { sightings, error, isLoading } = useSightings(
    moderation ? moderationUrl : mySightings ? findMySightingsUrl() : foundUrl
  );

  if (error) {
    return (
      <SightingsContainer>
        <PageTitle>{title}</PageTitle>
        <ApiErrorMessage hasGif={true} message={error}></ApiErrorMessage>
      </SightingsContainer>
    );
  }

  if (isLoading) {
    return (
      <SightingsContainer>
        <PageTitle>{title}</PageTitle>
        <Loader size={200} light={true} />
      </SightingsContainer>
    );
  }

  if (sightings && sightings.length <= 0) {
    return (
      <SightingsContainer $moderation={moderation}>
        <PageTitle>{title}</PageTitle>
        <p>
          {moderation
            ? 'There are no sightings to moderate at the moment.'
            : "There aren't any sightings yet."}
        </p>
      </SightingsContainer>
    );
  }

  if (sightings && sightings.length >= 1) {
    return (
      <SightingsContainer $moderation={moderation}>
        <PageTitle>{title}</PageTitle>
        <StyledGridContainer>
          {sightings &&
            moderation &&
            sightings.map((sighting, index) => (
              <SightingsCard
                key={index}
                sighting={sighting}
                moderation={moderation}
              ></SightingsCard>
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
      </SightingsContainer>
    );
  }

  return null;
};

export default SightingsGrid;
