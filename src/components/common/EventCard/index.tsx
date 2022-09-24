import moment from 'moment';
import React, { Dispatch, SetStateAction } from 'react';
import { EventInterface } from '../../../hooks/useEvents';
import { DateContainer, EventCardWrapper } from './index.styled';

const EventCard = ({
  event,
  setIsOpen,
  setCurrentEvent,
}: {
  event: EventInterface;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentEvent: Dispatch<SetStateAction<EventInterface | null | undefined>>;
}) => {
  return (
    <EventCardWrapper
      onClick={() => {
        setIsOpen(true);
        setCurrentEvent(event);
      }}
    >
      <DateContainer>
        <span>{moment(event.attributes.date).format('D')}</span>
        <h3>{moment(event.attributes.date).format('MMM')}</h3>
      </DateContainer>
      <div>
        <h2>{event.attributes.eventTitle}</h2>
        <p>
          <span>When: </span>
          {moment(event.attributes.date).format('dddd - hh:mm')}
        </p>
        <p>
          <span>Where: </span>
          {event.attributes.location}
        </p>
        <p>
          <span>Who: </span>
          {event.attributes.participants}
        </p>
      </div>
    </EventCardWrapper>
  );
};

export default EventCard;
