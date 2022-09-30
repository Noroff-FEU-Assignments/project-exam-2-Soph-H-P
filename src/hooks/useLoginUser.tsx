import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { accessTokenUrlEndpoint } from '../constants/api';
import axios from 'axios';
import { FormInstance } from 'antd';
import { useAuthState } from '../context/AuthContext';
import { useUserState } from '../context/UserContext';
import useUserProfile from './useUserProfile';

export interface LoginFormInterface {
  identifier: string;
  password: string;
}

const useLoginUser = (form: FormInstance) => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setAuthToken } = useAuthState();
  const navigate = useNavigate();
  const { getUserProfile } = useUserProfile();



  const submitForm = async (data: LoginFormInterface) => {
    setIsSubmitting(true);
    setLoginError(null);
    try {
      const response = await axios.post(API + accessTokenUrlEndpoint, data);
      setAuthToken(response.data.jwt);
      getUserProfile(response.data.user.id, response.data.user.username);
      form.resetFields();
      if (response.data.user.userRole === 'admin') {
        navigate('/admin/moderate-sightings');
      } else {
        navigate('/');
      }
    } catch (error: unknown) {
      console.log('error', error);
      if (axios.isAxiosError(error)) {
        if (!error?.response) {
          console.log('No Server Response');
          setLoginError(
            'Looks like there is a problem with our server, please check and try again. Or register if you are new here.'
          );
        } else if (error.response?.status === 400 || error.response?.status === 403) {
          setLoginError(
            'Looks like your username or password is wrong, please check and try again. Or register if you are new here.'
          );
        } else {
          setLoginError(
            'Sorry we seem to be have trouble logging you in at the moment, please try again later.'
          );
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { loginError, isSubmitting, submitForm };
};

export default useLoginUser;
