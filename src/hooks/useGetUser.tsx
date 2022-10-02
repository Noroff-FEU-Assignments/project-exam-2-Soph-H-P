import axios from 'axios';
import { useState } from 'react';

import API, { profileUrlEndpoint } from '../constants/api';
import { useAuthState } from '../context/AuthContext';
import useCheckUnauthorizedUser from './useCheckUnauthorizedUser';

interface UserDataInterface {
  userRole: string;
  username: string;
  sightings: number;
}

/**
 * useGetUser returns a function getUser which sets an user state that is also returned.
 * This state can be used to provide users information
 * @example getUser()
 * @returns {getUser, error, isLoading, user}
 */

const useGetUser = (): {
  getUser: (id: string) => Promise<void>;
  error: string | null;
  isLoading: boolean;
  user: UserDataInterface | null;
} => {
  const [user, setUser] = useState<UserDataInterface | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { authToken } = useAuthState();
  const { checkUnauthorizedUser } = useCheckUnauthorizedUser();

  const getUser = async (id: string) => {
    if (id && authToken) {
      const url = `${API}${profileUrlEndpoint}/${id}?populate=sightings`;
      try {
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };

        const response = await axios.get(url, { headers });
        if (response.status === 200) {
          const user = response.data.data.attributes;
          const userData = {
            userRole: user.userRole,
            username: user.username,
            sightings: user.sightings.data.length,
          };
          setUser(userData);
        } else {
          setError(
            'Oops something went wrong. We are having trouble finding that user at the moment',
          );
        }
      } catch (error) {
        checkUnauthorizedUser(
          error,
          setError,
          'Oops something went wrong. We are having trouble finding that user at the moment',
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return { user, error, isLoading, getUser };
};

export default useGetUser;
