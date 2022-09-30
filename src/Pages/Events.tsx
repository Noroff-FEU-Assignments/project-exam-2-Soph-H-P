import EventsCalendar from '../components/events/EventsCalendar';
import MetaData from '../components/common/MetaData';
import EventsForm from '../components/forms/EventsForm';
import { PageContainer } from '../components/layout/PageContainer/index.styled';
import { useUserState } from '../context/UserContext';

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

  return (
    <PageContainer $isReversed={true} $isSplit={userInfo?.userRole === 'admin' ? true : false}>
      <MetaData
        title="Events | Birds of Østfold"
        metaDescription="Take a look at what is going on for bird spotters in your local area."
      />
      <EventsCalendar />
      {userInfo?.userRole === 'admin' && <EventsForm />}
    </PageContainer>
  );
};

export default Events;
