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

const useEvents = (url?: string) => {
  // const [sightings, setSightings] = useState<SightingInterface[] | null>(null);
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
