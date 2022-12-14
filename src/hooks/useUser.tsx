import { FormInstance } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API, { userEndpoint } from '../constants/api';
import { useAuthState } from '../context/AuthContext';
import useCheckUnauthorizedUser from './useCheckUnauthorizedUser';
import useUserProfile from './useUserProfile';

/**
 * useSubmitSightingsForm returns two functions
 * submitUpdateForm which handles updating user information including username
 * and admin status, this also updates the connected profile
 * deleteUser deletes the user and the connected profile
 * @example submitForm(data, setVisibleEvents)
 * @param {FormInstance} form the form which is being submitted
 * @returns { formIsSubmitted, formError, isSubmitting, submitUpdateForm, deleteUser, isDeleting}
 */

const useUser = (
  form?: FormInstance,
): {
  formIsSubmitted: string | null;
  formError: string | null;
  isSubmitting: boolean;
  submitUpdateForm: (data: any, id: string) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  isDeleting: boolean;
} => {
  const [formIsSubmitted, setFormIsSubmitted] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { authToken } = useAuthState();
  const navigate = useNavigate();
  const { checkUnauthorizedUser } = useCheckUnauthorizedUser();
  const { deleteUserProfile, updateUserProfile } = useUserProfile();

  const submitUpdateForm = async (data: any, id: string) => {
    setIsSubmitting(true);
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const response = await axios.put(`${API}${userEndpoint}/${id}`, data, { headers });

      if (response.status === 200) {
        updateUserProfile(response.data.username, data);
        setFormIsSubmitted('This user has been updated');
      }
      form && form.resetFields();
    } catch (error) {
      checkUnauthorizedUser(
        error,
        setFormError,
        'We seem to be having trouble saving the changes, please try again later',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteUser = async (id: string) => {
    setIsDeleting(true);
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const response = await axios.delete(`${API}${userEndpoint}/${id}`, {
        headers: headers,
      });
      deleteUserProfile(response.data.username);
      if (response.status === 200) {
        setFormIsSubmitted('This event has been deleted');
      }
      form && form.resetFields();
    } catch (error) {
      checkUnauthorizedUser(
        error,
        setFormError,
        'We seem to be having trouble deleting this event, please try again later',
      );
    } finally {
      setIsDeleting(false);
      navigate('/');
    }
  };

  return {
    formIsSubmitted,
    formError,
    isSubmitting,
    submitUpdateForm,
    deleteUser,
    isDeleting,
  };
};

export default useUser;
