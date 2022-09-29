import type { Moment } from 'moment';
import moment from 'moment';
import { EventInterface } from '../hooks/useEvents';
import datesAreSame from './datesAreSame';

const getListData = (value: Moment, events?: EventInterface[] | null) => {
  const listData: { type: string; content: string; event: EventInterface }[] = [];
  if (events) {
    events.forEach((event) => {
      const date = new Date(event.attributes.date);
      const momentDate = moment(date);
      const eventTime = moment(momentDate).format('hh:mm');
      if (datesAreSame(value, momentDate)) {
        const eventsListElement = {
          type: 'success',
          content: `${event.attributes.eventTitle} at ${eventTime}`,
          event: event,
        };
        listData.push(eventsListElement);
      }
    });
  }
  return listData;
};

export default getListData;
