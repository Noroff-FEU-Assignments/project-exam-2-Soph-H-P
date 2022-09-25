import { useState } from 'react';
import API, { eventsEndpoint, userEndpoint } from '../constants/api';

import axios from 'axios';
import { FormInstance } from 'antd';
import { useAuthState } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const useUser = (form: FormInstance) => {
  const [formIsSubmitted, setFormIsSubmitted] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { authToken } = useAuthState();
  const navigate = useNavigate();

  const submitUpdateForm = async (data: any, id: string) => {
    setIsSubmitting(true);
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const response = await axios.put(`${API}${userEndpoint}/${id}`, data, { headers });
      console.log(data);
      console.log(response);

      setFormIsSubmitted('This user has been updated');
      //   form.resetFields();
    } catch (error: unknown) {
      setFormError('We seem to be having trouble saving the changes, please try again later');
      console.log(error);
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
      const response = await axios.delete(`${API}${userEndpoint}/${id}`, { headers: headers });
      console.log(response);
      setFormIsSubmitted('This event has been deleted');
      form.resetFields();
    } catch (error: unknown) {
      setFormError('We seem to be having trouble deleting this event, please try again later');
      console.log(error);
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
