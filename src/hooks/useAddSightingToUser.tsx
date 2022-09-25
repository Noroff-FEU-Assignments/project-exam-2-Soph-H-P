import axios from 'axios';
import { useState } from 'react';
import API, { userEndpoint } from '../constants/api';
import { useAuthState } from '../context/AuthContext';

const useAddSightingToUser = (userId: string) => {
  const [sightingIsAdded, setsightingIsAdded] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAddingSighting, setIsSubmittingSighting] = useState(false);
  const { authToken } = useAuthState();

  const addSightingToUser = async (userId: string) => {
    setIsSubmittingSighting(true);

    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const userResponse = await axios.get(`${API}${userEndpoint}/${userId}`, {
        headers,
      });
      const user = userResponse.data;
      const data = {
        sightings: user.sightings === null ? 1 : user.sightings + 1,
      };
      const response = await axios.put(`${API}${userEndpoint}/${userId}`, data, { headers });
      console.log(response);
      setsightingIsAdded('This user has been updated');
    } catch (error: unknown) {
      setError('We seem to be having trouble saving the changes, please try again later');
      console.log(error);
    } finally {
      setIsSubmittingSighting(false);
    }
  };
  return { addSightingToUser, sightingIsAdded, error, isAddingSighting };
};

export default useAddSightingToUser;
