import React, { useEffect, useState } from 'react';
import EventsCalendar from '../components/common/EventsCalendar';
import EventsForm from '../components/forms/EventsForm';
import { PageContainer } from '../components/layout/PageContainer/index.styled';
import { useUserState } from '../context/UserContext';

const Events = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { userInfo } = useUserState();

  const handleResizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow);
    return () => window.removeEventListener('resize', handleResizeWindow);
  }, []);

  return (
    <PageContainer $isSplit={userInfo?.userRole === 'admin' ? true : false}>
      <EventsCalendar />
      {userInfo?.userRole === 'admin' && (
        <EventsForm />
      )}
    </PageContainer>
  );
};

export default Events;
