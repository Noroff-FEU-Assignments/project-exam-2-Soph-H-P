import { useState, useEffect } from 'react';
import API, { sightingsEndpoint, includingImagesQuery } from '../constants/api';
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
    userStatus: 'admin' | 'novis' | 'bronze' | 'silver' | 'gold';
  };
}

const useSightings = () => {
  const [sightings, setSightings] = useState<SightingInterface[] | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const url = API + sightingsEndpoint + includingImagesQuery;
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          setSightings(response.data.data);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { sightings, error, isLoading };
};

export default useSightings;
