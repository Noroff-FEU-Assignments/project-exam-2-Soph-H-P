import React, { Dispatch, useEffect, useState } from 'react';
import type { BadgeProps } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Moment } from 'moment';
import useEvents from '../../../hooks/useEvents';
import API, { eventsEndpoint } from '../../../constants/api';
import moment from 'moment';
import { EventInterface } from '../../../hooks/useEvents';
import EventModal from '../../modals/EventModal';
import { CalendarContainer } from './index.styled';
import { useUserState } from '../../../context/UserContext';
import EditEventModal from '../../modals/EditEventModal';
import PageTitle from '../../typography/PageTitle';
import EventCard from '../EventCard';
import getListData from '../../../utils/createEventListData';

/**
 * The events calender listens for the page width and at desktop size will render
 * a full calendar. For mobile size devices a simple list of events is created
 * There is also a modal that when opened displays the event to a general user
 * and to the admin displays the edit event form
 *
 * @example <EventsCalendar />
 * @returns {React.ReactElement}
 */

const EventsCalendar = ({
  visibleEvents,
  setVisibleEvents,
}: {
  visibleEvents: EventInterface[] | null;
  setVisibleEvents: Dispatch<React.SetStateAction<EventInterface[] | null | undefined>>;
}): React.ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<EventInterface | null>();
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

  const dateCellRender = (value: Moment) => {
    const listData = getListData(value, visibleEvents);
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
          setIsOpen={setIsOpen}
          handleCancel={() => setIsOpen(false)}
          currentEvent={currentEvent}
          setVisibleEvents={setVisibleEvents}
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
          {visibleEvents &&
            visibleEvents.map((event) => {
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
