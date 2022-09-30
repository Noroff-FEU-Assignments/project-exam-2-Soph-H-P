import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { registerUrlEndpoint } from '../constants/api';
import axios from 'axios';
import { FormInstance } from 'antd';
import { useAuthState } from '../context/AuthContext';
import { useUserState } from '../context/UserContext';
import useUserProfile from './useUserProfile';

export interface RegisterFormInterface {
  username: string;
  email: string;
  password: string;
}

const useRegisterUser = (form: FormInstance) => {
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setAuthToken } = useAuthState();
  const { setUserInfo } = useUserState();
  const navigate = useNavigate();
  const { createProfile } = useUserProfile();

  const submitForm = async (data: RegisterFormInterface) => {
    setIsSubmitting(true);
    setRegisterError(null);

    try {
      const convertToFormData = (data: RegisterFormInterface) => {
        const formData = new FormData();
        //@ts-ignore: string cannot be used as key
        Object.keys(data).forEach((key) => formData.append(key, data[key]));
        console.log(data);
        return formData;
      };

      const body = convertToFormData(data);

      const response = await axios.post(API + registerUrlEndpoint, body);
      const profileData = {
        user: response.data.user.id,
        userRole: response.data.user.userRole,
        username: response.data.user.username,
      };


      createProfile(profileData, response.data.jwt);

      setAuthToken(response.data.jwt);
      setUserInfo(response.data.user);
      form.resetFields();
      navigate('/');
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
      setIsSubmitting(false);
    }
  };

  return { registerError, isSubmitting, submitForm };
};

export default useRegisterUser;
