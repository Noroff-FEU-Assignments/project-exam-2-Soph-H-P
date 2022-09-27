import React, { useEffect, useState } from 'react';
import type { BadgeProps } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Moment } from 'moment';
import useEvents from '../../../hooks/useEvents';
import API, { eventsEndpoint } from '../../../constants/api';
import moment from 'moment';
import { EventInterface } from '../../../hooks/useEvents';
import datesAreSame from '../../../utils/datesAreSame';
import EventModal from '../EventModal';
import { CalendarContainer } from './index.styled';
import { useUserState } from '../../../context/UserContext';
import EditEventModal from '../EditEventModal';
import PageTitle from '../typography/PageTitle';
import EventCard from '../EventCard';

const EventsCalendar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<EventInterface | null>();
  const url = `${API}${eventsEndpoint}`;
  const { events } = useEvents(url);
  const startOfMonth = moment();
  const endOfMonth = moment();
  const { userInfo } = useUserState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow);
    return () => window.removeEventListener('resize', handleResizeWindow);
  }, []);

  const getListData = (value: Moment) => {
    const listData: { type: string; content: string; event: EventInterface }[] = [];
    if (events) {
      events.forEach((event) => {
        const date = new Date(event.attributes.date);
        const momentDate = moment(date);
        const eventTime = moment(momentDate).format('hh:mm');
        if (datesAreSame(value, momentDate)) {
          const thing = {
            type: 'success',
            content: `${event.attributes.eventTitle} at ${eventTime}`,
            event: event,
          };
          listData.push(thing);
        }
      });
    }
    return listData;
  };

  const dateCellRender = (value: Moment) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData &&
          listData.length > 0 &&
          listData.map((item, index) => (
            <li
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(true);
                setCurrentEvent(item.event);
              }}
            >
              <Badge status={item.type as BadgeProps['status']} text={item.content} />
            </li>
          ))}
      </ul>
    );
  };

  return (
    <CalendarContainer $isAdmin={userInfo?.userRole === 'admin'}>
      <PageTitle>Events</PageTitle>
      {userInfo?.userRole === 'admin' && isOpen && (
        <EditEventModal
          isOpen={isOpen}
          handleCancel={() => setIsOpen(false)}
          currentEvent={currentEvent}
        />
      )}
      {(userInfo?.userRole === 'admin' && windowWidth >= 900) ||
      (!userInfo && windowWidth >= 700) ||
      (userInfo?.userRole !== 'admin' && windowWidth >= 700) ? (
        <>
          {userInfo?.userRole !== 'admin' && (
            <EventModal
              isOpen={isOpen}
              handleCancel={() => setIsOpen(false)}
              currentEvent={currentEvent}
            />
          )}
          <Calendar
            dateCellRender={dateCellRender}
            mode={'month'}
            validRange={isOpen ? [startOfMonth, endOfMonth] : undefined}
          />
        </>
      ) : (
        <>
          {events &&
            events.map((event) => {
              return (
                <EventCard event={event} setIsOpen={setIsOpen} setCurrentEvent={setCurrentEvent} />
              );
            })}
        </>
      )}
    </CalendarContainer>
  );
};

export default EventsCalendar;
