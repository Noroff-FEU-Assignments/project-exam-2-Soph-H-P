import type { Moment } from 'moment';
import moment from 'moment';
import { EventInterface } from '../hooks/useEvents';
import datesAreSame from './datesAreSame';

/**
 * Makes a list of data that is used by the calendar element on the events page
 * this list is mapped to display events to users.
 * @param {Moment} value
 * @param {EventInterface[] | null} events
 * @example getListData(date, events)
 * @returns {listData: {type: string;content: string; event: EventInterface;}[]}
 */

const getListData = (
  value: Moment,
  events?: EventInterface[] | null
): { type: string; content: string; event: EventInterface }[] => {
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
