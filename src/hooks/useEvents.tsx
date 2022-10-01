import { useState, useEffect } from 'react';
import axios from 'axios';

export interface EventInterface {
  attributes: {
    createdAt: string;
    date: string;
    eventTitle: string;
    location: string;
    participants: string;
    updatedAt: string;
  };
  id: number;
}

/**
 * useEvents returns a function getEvents which sets an event state that is also returned.
 * This state can be used to provide events for components
 * @example getEvents()
 * @param {string} url where the events will come from
 * @returns {getEvents, error, isLoading, events}
 */

const useEvents = (
  url?: string
): {
  getEvents: () => Promise<void>;
  error: string | null;
  isLoading: boolean;
  events: EventInterface[] | null | undefined;
} => {
  const [events, setEvents] = useState<EventInterface[] | null>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getEvents = async () => {
    if (url) {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          setEvents(response.data.data);
        }
      } catch (error) {
        console.log(error);
        setError(
          'We are having trouble finding events at the moment, please come back again later'
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getEvents();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { events, error, isLoading, getEvents };
};

export default useEvents;
