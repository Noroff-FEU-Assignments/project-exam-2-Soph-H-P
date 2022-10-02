import { useEffect, useState } from 'react';

import Loader from '../components/common/Loader';
import MetaData from '../components/common/MetaData';
import EventsCalendar from '../components/events/EventsCalendar';
import EventsForm from '../components/forms/EventsForm';
import { PageContainer } from '../components/layout/PageContainer/index.styled';
import API, { eventsEndpoint } from '../constants/api';
import { useUserState } from '../context/UserContext';
import useEvents, { EventInterface } from '../hooks/useEvents';

/**
 * Main page component for the Events page, this page renders
 * an events calender compoenent and the events form
 * if the user is an admin user
 *
 * @example <Events />
 * @returns {React.ReactElement}
 */

const Events = (): React.ReactElement => {
  const { userInfo } = useUserState();
  const url = `${API}${eventsEndpoint}`;
  const { events, isLoading } = useEvents(url);
  const [visibleEvents, setVisibleEvents] = useState<EventInterface[] | null | undefined>(
    null,
  );

  useEffect(() => {
    if (events) {
      setVisibleEvents(events);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  return (
    <PageContainer
      $isReversed={true}
      $isSplit={userInfo?.userRole === 'admin' ? true : false}
    >
      <MetaData
        title="Events | Birds of Østfold"
        metaDescription="Take a look at what is going on for bird spotters in your local area."
      />
      {isLoading && <Loader size={100} />}
      {visibleEvents && (
        <>
          <EventsCalendar
            visibleEvents={visibleEvents}
            setVisibleEvents={setVisibleEvents}
          />
          {userInfo?.userRole === 'admin' && (
            <EventsForm setVisibleEvents={setVisibleEvents} />
          )}
        </>
      )}
    </PageContainer>
  );
};

export default Events;
