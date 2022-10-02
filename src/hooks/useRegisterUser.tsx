import { FormInstance } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API, { registerUrlEndpoint } from '../constants/api';
import { useAuthState } from '../context/AuthContext';
import useUserProfile from './useUserProfile';

export interface RegisterFormInterface {
  username: string;
  email: string;
  password: string;
}

/**
 * useRegisterUser returns a function submitForm which takes user registration details and authenticates them
 * a profile is also created and linked to the user. The authentication token is set allowing the user to
 * be logged in.
 * The form element allows the feilds to be reset on success
 * @example submitForm(data)
 * @param {FormInstance} form the form which is being submitted
 * @returns {submitForm, registerError, isSubmitting, isSubmitted}
 */

const useRegisterUser = (
  form: FormInstance,
): {
  submitForm: (data: RegisterFormInterface) => Promise<void>;
  registerError: string | null;
  isSubmitting: boolean;
  isSubmitted: boolean;
} => {
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { setAuthToken } = useAuthState();
  const navigate = useNavigate();
  const { createProfile } = useUserProfile();

  const submitForm = async (data: RegisterFormInterface) => {
    setIsSubmitting(true);
    setRegisterError(null);

    try {
      const convertToFormData = (data: RegisterFormInterface) => {
        const formData = new FormData();
        //@ts-ignore: string cannot be used as key
        Object.keys(data).forEach(key => formData.append(key, data[key]));
        return formData;
      };

      const body = convertToFormData(data);

      const response = await axios.post(API + registerUrlEndpoint, body);
      const profileData = {
        user: response.data.user.id,
        userRole: response.data.user.userRole,
        username: response.data.user.username,
        userId: response.data.user.id.toString(),
      };

      createProfile(profileData, response.data.jwt);

      setAuthToken(response.data.jwt);
      form.resetFields();
      setIsSubmitted(true)
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.log('error', error);
      if (axios.isAxiosError(error)) {
        if (!error?.response) {
          console.log('No Server Response');
          setRegisterError(
            'Looks like there is a problem with our server, please try again later.',
          );
        } else if (
          // @ts-ignore: unknown object
          error.response?.data.error.message ===
          'An error occurred during account creation'
        ) {
          setRegisterError(
            'Oops something went wrong. It may be that that username is taken, please try another.',
          );
        } else if (error.response?.status === 400 || error.response?.status === 403) {
          setRegisterError(
            'Oops something went wrong. ' +
              // @ts-ignore: unknown object
              error.response.data.error.message,
          );
        } else {
          setRegisterError(
            'Sorry we seem to be have trouble registering you at the moment, please try again later.',
          );
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { registerError, isSubmitting, submitForm, isSubmitted };
};

export default useRegisterUser;
