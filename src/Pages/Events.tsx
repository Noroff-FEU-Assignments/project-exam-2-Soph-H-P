import EventsCalendar from '../components/events/EventsCalendar';
import MetaData from '../components/common/MetaData';
import EventsForm from '../components/forms/EventsForm';
import { PageContainer } from '../components/layout/PageContainer/index.styled';
import { useUserState } from '../context/UserContext';

const Events = () => {
  const { userInfo } = useUserState();

  return (
    <PageContainer $isReversed={true} $isSplit={userInfo?.userRole === 'admin' ? true : false}>
      <MetaData
        title="Events | Birds of Østfold"
        description="Take a look at what is going on for bird spotters in your local area."
      />
      <EventsCalendar />
      {userInfo?.userRole === 'admin' && <EventsForm />}
    </PageContainer>
  );
};

export default Events;
