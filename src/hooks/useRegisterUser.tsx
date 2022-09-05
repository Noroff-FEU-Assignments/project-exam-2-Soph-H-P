import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { registerUrlEndpoint } from '../constants/api';
import axios from 'axios';
import { FormInstance } from 'antd';
import { useAuthState } from '../context/AuthContext';
import { useUserState } from '../context/UserContext';

const useRegisterUser = (form: FormInstance) => {
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setAuthToken } = useAuthState();
  const { setUserInfo } = useUserState();
  const navigate = useNavigate();

  const submitForm = async (data: any) => {
    setIsSubmitting(true);
    setRegisterError(null);

    console.log(data);

    try {
      const convertToFormData = (data: any) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => formData.append(key, data[key]));
        return formData;
      };
      const body = convertToFormData(data);

      const response = await axios.post(API + registerUrlEndpoint, body);
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
            'Looks like there is a problem with our server, please check and try again.'
          );
        } else if (error.response?.status === 400 || error.response?.status === 403) {
          setRegisterError(
            'Oops something went wrong. ' +
              // @ts-ignore: unknown object
              error.response.data.error.message
          );
        } else {
          setRegisterError(
            'Sorry we seem to be have trouble logging you in at the moment, please try again later.'
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
