import { useState, useEffect } from 'react';
import axios from 'axios';
import { SightingInterface } from './useSightings';


const useSingleSighting = (url: string) => {
  const [sighting, setSightings] = useState<SightingInterface | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getSightings = async () => {
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setSightings(response.data.data);
      }
    } catch (error) {
      console.log(error);
      setError(
        'Oops something went wrong. We are having trouble finding that particular sighting at the moment'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSightings();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { sighting, error, isLoading, getSightings };
};

export default useSingleSighting;
