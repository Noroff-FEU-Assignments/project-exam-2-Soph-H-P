import { useState } from 'react';
import axios from 'axios';
import API, { sightingsEndpoint } from '../constants/api';
import { useAuthState } from '../context/AuthContext';
import useUploadImage from './useUploadImage';

const useDeleteSighting = () => {
  const [error, setError] = useState<string | null>('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false)
  const { authToken } = useAuthState();
  const { deleteImage } = useUploadImage();
  const deleteSighting = async (id: number, imageId?: number) => {
    setIsDeleting(true);
    setError(null);

    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const response = await axios.delete(`${API}${sightingsEndpoint}/${id} `, {
        headers: headers,
      });
      if (response.status === 200 && imageId) {
        deleteImage(imageId);
      }
    } catch (error: unknown) {
      console.log('error', error);
      if (axios.isAxiosError(error)) {
        if (!error?.response) {
          console.log('No Server Response');
          setError('Looks like there is a problem with our server, please check and try again.');
        } else if (error.response?.status === 400 || error.response?.status === 403) {
          setError('Looks like your username or password is wrong, please check and try again.');
        } else {
          setError(
            'Sorry we seem to be have trouble logging you in at the moment, please try again later.'
          );
        }
      }
    } finally {
      setIsDeleting(false);
      setIsDeleted(true)
    }
  };

  return { deleteSighting, error, isDeleting, isDeleted };
};

export default useDeleteSighting;
