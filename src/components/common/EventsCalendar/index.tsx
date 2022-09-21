import React, { useState } from 'react';
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

const EventsCalendar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<EventInterface | null>();
  const url = `${API}${eventsEndpoint}`;
  const { events } = useEvents(url);
  const startOfMonth = moment();
  const endOfMonth = moment();
  const { userInfo } = useUserState();

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
    <CalendarContainer>
      {userInfo?.userRole === 'admin' && isOpen && (
        <EditEventModal
          isOpen={isOpen}
          handleCancel={() => setIsOpen(false)}
          currentEvent={currentEvent}
        />
      )}
      {userInfo?.userRole !== 'admin' && (
        <EventModal
          isOpen={isOpen}
          handleCancel={() => setIsOpen(false)}
          currentEvent={currentEvent}
        />
      )}
      <Calendar
        dateCellRender={dateCellRender}
        onSelect={() => console.log('selected but nothing else')}
        mode={'month'}
        validRange={isOpen ? [startOfMonth, endOfMonth] : undefined}
      />
    </CalendarContainer>
  );
};

export default EventsCalendar;
