import { useState, useEffect } from 'react';
import axios from 'axios';
import API, { userEndpoint } from '../constants/api';
import { useAuthState } from '../context/AuthContext';
import { UserInterface } from '../context/UserContext';

const useGetUser = () => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { authToken } = useAuthState();

  const getUser = async (id: string) => {
    const url = `${API}${userEndpoint}/${id}`;
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };

      const response = await axios.get(url, { headers: headers });
      if (response.status === 200) {
        setUser(response.data);
      } else {
        setError(
          'Oops something went wrong. We are having trouble finding that user at the moment'
        );
      }
    } catch (error) {
      console.log(error);
      setError('Oops something went wrong. We are having trouble finding that user at the moment');
    } finally {
      setIsLoading(false);
    }
  };

  return { user, error, isLoading, getUser };
};

export default useGetUser;
