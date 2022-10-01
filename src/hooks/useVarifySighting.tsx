import { useState } from 'react';
import axios from 'axios';
import API, { sightingsEndpoint } from '../constants/api';
import { useAuthState } from '../context/AuthContext';
import useCheckUnauthorizedUser from './useCheckUnauthorizedUser';

const useVarifySighting = () => {
  const [error, setError] = useState<string | null>('');
  const [isVarifying, setIsVarifying] = useState(false);
  const [isVarified, setIsVarified] = useState(false);
  const { authToken } = useAuthState();
  const { checkUnauthorizedUser } = useCheckUnauthorizedUser();

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

      console.log(data);
      const response = await axios.put(`${API}${sightingsEndpoint}/${id}`, { data }, { headers });
      if (response) {
        setIsVarified(true);
      }
    } catch (error: unknown) {
      checkUnauthorizedUser(
        error,
        setError,
        'There seems to be trouble varifying this sighting, please try again later.'
      );
    } finally {
      setIsVarifying(false);
    }
  };

  return { varifySighting, error, isVarifying, isVarified };
};

export default useVarifySighting;
