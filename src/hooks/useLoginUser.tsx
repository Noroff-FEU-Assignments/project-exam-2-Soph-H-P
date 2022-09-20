import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { accessTokenUrlEndpoint } from '../constants/api';
import axios from 'axios';
import { FormInstance } from 'antd';
import { useAuthState } from '../context/AuthContext';
import { useUserState } from '../context/UserContext';

const useLoginUser = (form: FormInstance) => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setAuthToken } = useAuthState();
  const { setUserInfo } = useUserState();
  const navigate = useNavigate();

  const submitForm = async (data: any) => {
    setIsSubmitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(API + accessTokenUrlEndpoint, data);
      setAuthToken(response.data.jwt);
      setUserInfo(response.data.user);
      form.resetFields();
      if (response.data.user.userRole === "admin") {
        navigate('/admin/moderate-sightings');
      }
    } catch (error: unknown) {
      console.log('error', error);
      if (axios.isAxiosError(error)) {
        if (!error?.response) {
          console.log('No Server Response');
          setLoginError(
            'Looks like there is a problem with our server, please check and try again.'
          );
        } else if (error.response?.status === 400 || error.response?.status === 403) {
          setLoginError(
            'Looks like your username or password is wrong, please check and try again.'
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
