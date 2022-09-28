import { useState } from 'react';
import axios from 'axios';
import API, { sightingsEndpoint } from '../constants/api';
import { useAuthState } from '../context/AuthContext';

const useVarifySighting = () => {
  const [error, setError] = useState<string | null>('');
  const [isVarifying, setIsVarifying] = useState(true);
  const { authToken } = useAuthState();

  const varifySighting = async (id: number) => {
    setIsVarifying(true);
    setError(null);
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const data = {
        varified: true,
      };

     
      const response = await axios.put(`${API}${sightingsEndpoint}/${id}`, { data }, { headers });
    } catch (error: unknown) {
      console.log('error', error);
      if (axios.isAxiosError(error)) {
        if (!error?.response) {
          console.log('No Server Response');
          setError('Looks like there is a problem with our server, please try again later.');
        } else if (error.response?.status === 400 || error.response?.status === 403) {
          setError('There seems to be trouble varifying this sighting, please try again later.');
        } else {
          setError(
            'There seems to be trouble varifying this sighting, please try again later.'
          );
        }
      }
    } finally {
      setIsVarifying(false);
    }
  };

  return { varifySighting, error, isVarifying };
};

export default useVarifySighting;
