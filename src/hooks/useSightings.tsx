import axios from 'axios';
import { useEffect, useState } from 'react';

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
        },
      ];
    };
    public: boolean;
    species: string;
    updatedAt: string;
    userId: string;
    profileId: string;
    varified: boolean;
    username: string;
    nearestLocation: string;
  };
}

interface PaginationData {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/**
 * useSightings returns a function getSightings which sets a list of sightings that is also returned.
 * This state can be used to provide sightings for components.
 * There is also pagination data returned which allows for fetching more sightings.
 * @example getSightings(url)
 * @returns {getSightings, error, isLoading, sightings, paginationData}
 */

const useSightings = (
  url?: string,
  mySightings?: boolean,
): {
  getSightings: () => Promise<void>;
  error: string | null;
  isLoading: boolean;
  sightings: SightingInterface[] | null;
  paginationData: PaginationData | null;
} => {
  const [sightings, setSightings] = useState<SightingInterface[] | null>(null);
  const [paginationData, setPaginationData] = useState<PaginationData | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getSightings = async () => {
    if (url) {
      try {
        setIsLoading(true);
        const response = await axios.get(url);
        if (response.status === 200) {
          if (mySightings) {
            setSightings(response.data.data.attributes.sightings.data);
          } else {
            setSightings(response.data.data);
            setPaginationData(response.data.meta.pagination);
          }
        }
      } catch (error) {
        console.log(error);
        setError(
          'Oops we seem to be having trouble finding sightings at the moment, please come back again later',
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

  return { sightings, error, isLoading, getSightings, paginationData };
};

export default useSightings;
