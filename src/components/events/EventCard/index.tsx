import moment from 'moment';
import React, { Dispatch, SetStateAction } from 'react';

import { EventInterface } from '../../../hooks/useEvents';
import { DateContainer, EventCardWrapper } from './index.styled';

/**
 * The events card displays a signle event showing the user the date of the
 * event plus the details. When clicked on an admin user will be shown the edit event
 * modal
 *
 *
 * @param {Object} props
 * @param {EventInterface} props.event the event that will be displayed
 * @param {Dispatch<SetStateAction<boolean>>} props.setIsOpen true or false to display the editing modal
 * @param {Dispatch<SetStateAction<EventInterface | null | undefined>>} props.setCurrentEvent sets the event that will be displayed in the modal
 * @example <EventCard event={event} setIsOpen={setIsOpen} setCurrentEvent={setCurrentEvent} />
 * @returns {React.ReactElement}
 */

const EventCard = ({
  event,
  setIsOpen,
  setCurrentEvent,
}: {
  event: EventInterface;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentEvent: Dispatch<SetStateAction<EventInterface | null | undefined>>;
}): React.ReactElement => {
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
          {moment(event.attributes.date).format('dddd - HH:mm')}
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
