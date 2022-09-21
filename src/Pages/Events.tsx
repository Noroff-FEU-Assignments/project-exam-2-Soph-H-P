import React from 'react';
import EventsCalendar from '../components/common/EventsCalendar';
import { CalendarContainer } from '../components/common/EventsCalendar/index.styled';
import { PageContainer } from '../components/layout/PageContainer/index.styled';

const Events = () => {
  return (
    <PageContainer>
      <CalendarContainer>
        <EventsCalendar />
      </CalendarContainer>
    </PageContainer>
  );
};

export default Events;
