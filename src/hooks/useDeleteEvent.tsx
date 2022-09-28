import { useState } from 'react';
import axios from 'axios';
import API, { eventsEndpoint } from '../constants/api';
import { useAuthState } from '../context/AuthContext';

const useDeleteEvent = () => {
  const [error, setError] = useState<string | null>('');
  const [isDeleting, setIsDeleting] = useState(false);
  const { authToken } = useAuthState();
  const deleteEvent = async (id: number) => {
    setIsDeleting(true);
    setError(null);

    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const response = await axios.delete(`${API}${eventsEndpoint}/${id} `, {
        headers: headers,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (!error?.response) {
          console.log('No Server Response');
          setError('Looks like there is a problem with our server, please try again later.');
        } else if (error.response?.status === 400 || error.response?.status === 403) {
          setError('Sorry we seem to be have trouble logging you in at the moment, please try again later.');
        } else {
          setError(
            'Sorry we seem to be have trouble logging you in at the moment, please try again later.'
          );
        }
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteEvent, error, isDeleting };
};

export default useDeleteEvent;
