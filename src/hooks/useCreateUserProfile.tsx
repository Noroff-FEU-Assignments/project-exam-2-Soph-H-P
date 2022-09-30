import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { profileUrlEndpoint, registerUrlEndpoint } from '../constants/api';
import axios from 'axios';
import { FormInstance } from 'antd';
import { useAuthState } from '../context/AuthContext';
import { ProfileInterface, useUserState } from '../context/UserContext';



const useCreateUserProfile = () => {
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);
  const { setAuthToken } = useAuthState();
  const { setUserInfo } = useUserState();

  const createProfile = async (data: ProfileInterface, jwtToken: string) => {
    setIsCreating(true);
    setRegisterError(null);

    try {
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.post(API + profileUrlEndpoint, { data }, { headers });

    
      console.log(response);

      // setAuthToken(response.data.jwt);
      setUserInfo(data);
      // form.resetFields();
      // navigate('/');
    } catch (error: unknown) {
      console.log('error', error);
      if (axios.isAxiosError(error)) {
        if (!error?.response) {
          console.log('No Server Response');
          setRegisterError(
            'Looks like there is a problem with our server, please try again later.'
          );
        } else if (
          // @ts-ignore: unknown object
          error.response?.data.error.message === 'An error occurred during account creation'
        ) {
          setRegisterError(
            'Oops something went wrong. It may be that that username is taken, please try another.'
          );
        } else if (error.response?.status === 400 || error.response?.status === 403) {
          setRegisterError(
            'Oops something went wrong. ' +
              // @ts-ignore: unknown object
              error.response.data.error.message
          );
        } else {
          setRegisterError(
            'Sorry we seem to be have trouble registering you at the moment, please try again later.'
          );
        }
      }
    } finally {
      setIsCreating(false);
    }
  };

  return { registerError, setIsCreating, createProfile };
};

export default useCreateUserProfile;
