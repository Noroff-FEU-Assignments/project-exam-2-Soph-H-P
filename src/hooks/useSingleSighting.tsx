import { useState, useEffect } from 'react';
import axios from 'axios';
import { SightingInterface } from './useSightings';

/**
 * useSingleSighting returns a function getSighting which sets a sighting state that is also returned.
 * This state can be used to provide a sighting for the single sighting page.
 * There is also pagination data returned which allows for fetching more sightings.
 * @example getSighting()
 * @returns {getSighting, error, isLoading, sighting}
 */

const useSingleSighting = (
  url: string
): {
  getSighting: () => Promise<void>;
  error: string;
  isLoading: boolean;
  sighting: SightingInterface | null;
} => {
  const [sighting, setSightings] = useState<SightingInterface | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getSighting = async () => {
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
    getSighting();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { sighting, error, isLoading, getSighting };
};

export default useSingleSighting;
