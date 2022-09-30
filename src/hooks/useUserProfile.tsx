import { useState } from 'react';
import API, { profileUrlEndpoint } from '../constants/api';
import axios from 'axios';
import { useUserState } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '../context/AuthContext';

const useUserProfile = () => {
  const [creationError, setCreationError] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const { setUserInfo } = useUserState();
  const { authToken } = useAuthState();
  const navigate = useNavigate();

  const updateUserProfile = async (username: string, data: any) => {
    try {
      const response = await axios.get(
        `${API}${profileUrlEndpoint}?filters[username][$eq]=${username}`
      );
      const profile = response.data.data[0];
      try {
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };
        const updateResponse = await axios.put(
          `${API}${profileUrlEndpoint}/${profile.id}`,
          { data },
          {
            headers,
          }
        );
        if (updateResponse.status === 200) {
          setIsFinished(true);
        }
      } catch (error) {
        setCreationError(
          'Sorry we seem to be have trouble getting that profile at the moment, please try again later.'
        );
      }
      setIsFinished(true);
    } catch (error) {
      setCreationError(
        'Sorry we seem to be have trouble getting that profile at the moment, please try again later.'
      );
    }
  };

  const deleteUserProfile = async (username: string) => {
    try {
      const response = await axios.get(
        `${API}${profileUrlEndpoint}?filters[username][$eq]=${username}`
      );

      const profile = response.data.data[0];
      try {
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };
        const deleteResponse = await axios.delete(`${API}${profileUrlEndpoint}/${profile.id}`, {
          headers,
        });
        if (deleteResponse.status === 200) {
          setIsFinished(true);
        }
      } catch (error) {
        setCreationError(
          'Sorry we seem to be have trouble getting that profile at the moment, please try again later.'
        );
      }
    } catch (error) {
      setCreationError(
        'Sorry we seem to be have trouble getting that profile at the moment, please try again later.'
      );
    }
  };

  const getMyUserProfile = async (userId: number, username: string) => {
    try {
      const response = await axios.get(
        `${API}${profileUrlEndpoint}?filters[username][$eq]=${username}`
      );

      const profile = response.data.data[0];
      const profileData = {
        user: userId,
        userRole: profile.attributes.userRole as string,
        username: username,
        profileId: profile.id as string,
      };
      setUserInfo(profileData);
      setIsFinished(true);
      if (profile.attributes.userRole === 'admin') {
        navigate('/admin/moderate-sightings');
      } else {
        navigate('/');
      }
    } catch (error) {
      setCreationError(
        'Sorry we seem to be have trouble getting that profile at the moment, please try again later.'
      );
    }
  };

  const createProfile = async (data: any, jwtToken: string) => {
    setCreationError(null);

    try {
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.post(API + profileUrlEndpoint, { data }, { headers });
      data.profileId = response.data.data.id;
      setUserInfo(data);
    } catch (error: unknown) {
      console.log('error', error);
      if (axios.isAxiosError(error)) {
        if (!error?.response) {
          console.log('No Server Response');
          setCreationError(
            'Looks like there is a problem with our server, please try again later.'
          );
        } else {
          setCreationError(
            'Sorry we seem to be have trouble creating a new profile at the moment, please try again later.'
          );
        }
      }
    } finally {
      setIsFinished(true);
    }
  };

  return {
    creationError,
    isFinished,
    createProfile,
    getMyUserProfile,
    deleteUserProfile,
    updateUserProfile,
  };
};

export default useUserProfile;
