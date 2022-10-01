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

/**
 * Sightings grid sets visible sightings state based on the sightings fetched from the api
 * the url is decided depending on whether moderation or my sightings is passed.
 * This sightings state allows more sightings to be fetched from the api.
 * It also allows the sightings to be removed from sight when they are either accepted
 * or rejected by an admin
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {boolean | undefined} props.moderation
 * @param {boolean | undefined} props.mySightings
 * @example
 * <SightingsGrid title={title} moderation={true}/>
 * returns sightings grid with a title and displays sightings for moderation
 * @example
 * <SightingsGrid title={title} mySightings={true}/>
 * returns sightings grid with a title and displays sightings for a particular users
 * @returns {React.ReactElement}
 */

const SightingsGrid = ({
  title,
  moderation,
  mySightings,
}: {
  title: string;
  moderation?: boolean;
  mySightings?: boolean;
}): React.ReactElement => {
  const { userInfo } = useUserState();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [url, setUrl] = useState<string>('');
  const [visibleSightings, setVisibleSightings] = useState<SightingInterface[] | null>(null);
  const { sightings, error, isLoading, paginationData } = useSightings(url, mySightings);

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
      if (mySightings) {
        //sort order of my sightings descending
        setVisibleSightings(
          visibleSightings.sort((firstDate, secondDate) => {
            const firstDateValue = new Date(firstDate.attributes.date);
            const secondDateValue = new Date(secondDate.attributes.date);
            //@ts-ignore: date type
            return secondDateValue - firstDateValue;
          })
        );
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

  if (visibleSightings && visibleSightings.length >= 1) {
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
        {paginationData && paginationData.page < paginationData.pageCount && (
          <Button size="large" onClick={handleViewMore}>
            View More
          </Button>
        )}
      </SightingsContainer>
    );
  }

  return <SightingsContainer $moderation={moderation} />;
};

export default SightingsGrid;
