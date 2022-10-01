import axios from 'axios';
import { useState } from 'react';
import createReverseLocationUrl from '../utils/createReverseLocationUrl';

/**
 * useNearestLocation returns a function findNearestLocation which sets an location state
 * this then supplies the name of the nearest place based on the lat and lng coordinates
 * @example findNearestLocation()
 * @returns {findNearestLocation, locationError, isLoading, location}
 */


const useNearestLocation = (): {
  findNearestLocation: (lat: number, lng: number) => Promise<void>;
  locationError: string | null;
  isLoading: boolean;
  location: string | null;
} => {
  const [location, setLocation] = useState<string | null>(null);
  const [locationError, setLocationError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const findNearestLocation = async (lat: number, lng: number) => {
    try {
      const url = createReverseLocationUrl(lat, lng);

      const response = await axios.get(url);
      const foundLocation = response.data.results[0].city || response.data.results[0].name;
      if (response.status === 200) {
        setLocation(foundLocation);
      }

    } catch (error) {
      console.log(error);
      setLocationError(
        'We are having trouble finding your location, please try again later'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { location, locationError, isLoading, findNearestLocation };
};

export default useNearestLocation;
