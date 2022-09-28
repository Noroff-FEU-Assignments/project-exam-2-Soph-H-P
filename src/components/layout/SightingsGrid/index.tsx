import { useEffect, useState } from 'react';
import API, {
  andFilterUnvarified,
  andSortByDate,
  includingImagesQuery,
  sightingsEndpoint,
} from '../../../constants/api';
import { useUserState } from '../../../context/UserContext';
import useSightings, { SightingInterface } from '../../../hooks/useSightings';
import findMySightingsUrl, { findSightingsUrl } from '../../../utils/findMySightingsUrl';
import ApiErrorMessage from '../../common/ApiErrorMessage';
import Loader from '../../common/Loader';
import ModerationSightingsCard from '../../sightingsCards/ModerationSightingsCard';
import SightingsCard from '../../sightingsCards/SightingsCard';
import PageTitle from '../../typography/PageTitle';
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

  const foundUrl = findSightingsUrl(userInfo);
  const moderationUrl = `${API}${sightingsEndpoint}?${includingImagesQuery}&${andSortByDate}&${andFilterUnvarified}`;
  const { sightings, error, isLoading } = useSightings(
    moderation ? moderationUrl : mySightings ? findMySightingsUrl(userInfo) : foundUrl
  );
  const [visibleSightings, setVisibleSightings] = useState<SightingInterface[] | null>(null);

  useEffect(() => {
    setVisibleSightings(sightings);
  }, [sightings]);

  if (error) {
    return (
      <SightingsContainer>
        <PageTitle>{title}</PageTitle>
        <ApiErrorMessage hasGif={true} message={error} />
      </SightingsContainer>
    );
  }

  if (isLoading) {
    return (
      <SightingsContainer $moderation={moderation}>
        <PageTitle>{title}</PageTitle>
        <Loader size={100} light={true} />
      </SightingsContainer>
    );
  }

  if ((sightings && sightings.length <= 0) || (visibleSightings && visibleSightings.length <= 0)) {
    return (
      <SightingsContainer $moderation={moderation}>
        <PageTitle>{title}</PageTitle>
        <p style={{ padding: 30 }}>
          {moderation ? 'There are no sightings to moderate at the moment.' : `No sightings yet.`}
        </p>
      </SightingsContainer>
    );
  }

  if (sightings && sightings.length >= 1) {
    return (
      <SightingsContainer $moderation={moderation}>
        <PageTitle>{title}</PageTitle>
        <div>
          <StyledGridContainer $moderation={moderation}>
            {visibleSightings &&
              moderation &&
              visibleSightings.map((sighting, index) => (
                <ModerationSightingsCard
                  key={index}
                  sighting={sighting}
                  setVisibleSightings={setVisibleSightings}
                />
              ))}
            {sightings &&
              !moderation &&
              sightings.map((sighting, index) => <SightingsCard key={index} sighting={sighting} />)}
          </StyledGridContainer>
        </div>
      </SightingsContainer>
    );
  }

  return <SightingsContainer $moderation={moderation} />;
};

export default SightingsGrid;
