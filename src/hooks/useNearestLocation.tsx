import axios from 'axios';
import { useEffect, useState } from 'react';
import { createReverseLocationUrl } from '../constants/api';

const useNearestLocation = (lat: number, lng: number) => {
  const [location, setLocation] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const url = createReverseLocationUrl(lat, lng);

        const response = await axios.get(url);
        const foundLocation = response.data.results[0].city || response.data.results[0].name;
        if (response.status === 200) {
          setLocation(foundLocation);
        }
      } catch (error) {
        console.log(error);
        setError(
          'We are having trouble finding sightings at the moment, please come back again later'
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, [lat, lng]);

  return { location, error, isLoading };
};

export default useNearestLocation;
