import React, { useEffect, useState } from 'react';
import EventsCalendar from '../components/common/EventsCalendar';
import EventsForm from '../components/forms/EventsForm';
import { PageContainer } from '../components/layout/PageContainer/index.styled';
import { useUserState } from '../context/UserContext';

const Events = () => {
  const { userInfo } = useUserState();

  return (
    <PageContainer $isReversed={true} $isSplit={userInfo?.userRole === 'admin' ? true : false}>
      <EventsCalendar />
      {userInfo?.userRole === 'admin' && <EventsForm />}
    </PageContainer>
  );
};

export default Events;
