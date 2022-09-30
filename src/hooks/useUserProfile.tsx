import { useState } from 'react';
import API, { profileUrlEndpoint } from '../constants/api';
import axios from 'axios';
import { ProfileInterface, useUserState } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const useUserProfile = () => {
  const [creationError, setCreationError] = useState<string | null>(null);
  const [isFinished, setIsFinishedd] = useState(false);
  const { setUserInfo } = useUserState();
  const navigate = useNavigate();
  
  const getUserProfile = async (userId: number, username: string) => {
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
      setUserInfo(profileData)
      setIsFinishedd(true)
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
      const newUserInfo = (data.profileId = response.data.id);
      setUserInfo(newUserInfo);
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
      setIsFinishedd(true);
    }
  };

  return { creationError, isFinished, createProfile, getUserProfile };
};

export default useUserProfile;
