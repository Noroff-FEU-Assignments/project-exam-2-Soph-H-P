import { FormInstance } from 'antd';
import axios from 'axios';
import { useState } from 'react';

import API, { accessTokenUrlEndpoint } from '../constants/api';
import { useAuthState } from '../context/AuthContext';
import useUserProfile from './useUserProfile';

export interface LoginFormInterface {
  identifier: string;
  password: string;
}

/**
 * useLoginUser returns a function submitForm which takes user login details and authenticates them
 * a profile is also fetched and set in local storage as userInfo. The authentication token is set allowing the user to
 * be logged in.
 * The form element allows the feilds to be reset on success
 * @example submitForm(data)
 * @param {FormInstance} form the form which is being submitted
 * @returns {submitForm, loginError, isSubmitting}
 */

const useLoginUser = (
  form: FormInstance,
): {
  submitForm: (data: LoginFormInterface) => Promise<void>;
  loginError: string | null;
  isSubmitting: boolean;
} => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setAuthToken } = useAuthState();
  const { getMyUserProfile } = useUserProfile();

  const submitForm = async (data: LoginFormInterface) => {
    setIsSubmitting(true);
    setLoginError(null);
    try {
      const response = await axios.post(API + accessTokenUrlEndpoint, data);
      setAuthToken(response.data.jwt);
      getMyUserProfile(response.data.user.id, response.data.user.username);
      form.resetFields();
    } catch (error) {
      console.log('error', error);
      if (axios.isAxiosError(error)) {
        if (!error?.response) {
          console.log('No Server Response');
          setLoginError(
            'Looks like there is a problem with our server, please check and try again. Or register if you are new here.',
          );
        } else if (error.response?.status === 400 || error.response?.status === 403) {
          setLoginError(
            'Looks like your username or password is wrong, please check and try again. Or register if you are new here.',
          );
        } else {
          setLoginError(
            'Sorry we seem to be have trouble logging you in at the moment, please try again later.',
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
