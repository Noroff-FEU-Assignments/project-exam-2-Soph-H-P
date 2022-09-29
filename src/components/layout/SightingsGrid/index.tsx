import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useUserState } from '../../../context/UserContext';
import useSightings, { SightingInterface } from '../../../hooks/useSightings';
import createPaginationSightingUrl from '../../../utils/createPaginationSightingsUrl';
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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [url, setUrl] = useState<string>('');
  const [visibleSightings, setVisibleSightings] = useState<SightingInterface[] | null>(null);
  const { sightings, error, isLoading, paginationData } = useSightings(url);

  const handleViewMore = () => {
    if (paginationData) {
      if (paginationData.page + 1 <= paginationData.pageCount)
        setCurrentPage(paginationData.page + 1);
    }
  };

  useEffect(() => {
    setUrl(createPaginationSightingUrl(currentPage, 12, userInfo, moderation, mySightings));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (visibleSightings === null) {
      setVisibleSightings(sightings);
    }
    if (sightings && visibleSightings) {
      //Prevents sightings being added multiple times
      if (
        !visibleSightings.some((sighting: SightingInterface) => sighting.id === sightings[0].id)
      ) {
        setVisibleSightings([...visibleSightings, ...sightings]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sightings]);

  if (error) {
    return (
      <SightingsContainer>
        <PageTitle>{title}</PageTitle>
        <ApiErrorMessage hasGif={true} message={error} />
      </SightingsContainer>
    );
  }

  if (isLoading && !visibleSightings) {
    return (
      <SightingsContainer $moderation={moderation}>
        <PageTitle>{title}</PageTitle>
        <Loader size={100} light={true} />
      </SightingsContainer>
    );
  }

  if ((!isLoading && !visibleSightings) || (visibleSightings && visibleSightings.length <= 0)) {
    return (
      <SightingsContainer $moderation={moderation}>
        <PageTitle>{title}</PageTitle>
        <p style={{ padding: 30 }}>
          {moderation ? 'There are no sightings to moderate at the moment.' : `No sightings yet.`}
        </p>
      </SightingsContainer>
    );
  }

  if (paginationData && visibleSightings && visibleSightings.length >= 1) {
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
            {visibleSightings &&
              !moderation &&
              visibleSightings.map((sighting, index) => (
                <SightingsCard key={index} sighting={sighting} />
              ))}
          </StyledGridContainer>
        </div>
        {isLoading && <Loader size={100} light={false} />}
        {paginationData.page < paginationData.pageCount && (
          <Button onClick={handleViewMore}>View More</Button>
        )}
      </SightingsContainer>
    );
  }

  return <SightingsContainer $moderation={moderation} />;
};

export default SightingsGrid;
