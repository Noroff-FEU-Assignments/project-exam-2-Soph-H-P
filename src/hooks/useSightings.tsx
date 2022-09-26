import { useState, useEffect } from 'react';
import axios from 'axios';

export interface SightingInterface {
  id: number;
  attributes: {
    createdAt: string;
    date: string;
    description: string;
    lat: number;
    lng: number;
    photos: {
      data: [
        {
          id: number;
          attributes: {
            formats: {
              small: {
                url: string;
              };
              medium: {
                url: string;
              };
              thumbnail: {
                url: string;
              };
            };
            url: string;
          };
        }
      ];
    };
    public: boolean;
    species: string;
    updatedAt: string;
    userId: string;
    varified: boolean;
    username: string;
    nearestLocation: string;
  };
}

const useSightings = (url?: string) => {
  const [sightings, setSightings] = useState<SightingInterface[] | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getSightings = async () => {
    if (url) {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          setSightings(response.data.data);
        }
      } catch (error) {
        console.log(error);
        setError(
          'Oops we seem to be having trouble finding sightings at the moment, please come back again later'
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getSightings();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { sightings, error, isLoading, getSightings };
};

export default useSightings;
