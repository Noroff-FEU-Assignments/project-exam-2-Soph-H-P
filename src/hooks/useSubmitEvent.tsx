import { useState } from 'react';
import API, { eventsEndpoint } from '../constants/api';

import axios from 'axios';
import { FormInstance } from 'antd';
import { useAuthState } from '../context/AuthContext';

const useSubmitEvent = (form: FormInstance) => {
  const [formIsSubmitted, setFormIsSubmitted] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { authToken } = useAuthState();
  const submitForm = async (data: any) => {
    setIsSubmitting(true);
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const response = await axios.post(API + eventsEndpoint, { data }, { headers });
      if (response.status === 200) {
        setFormIsSubmitted('This event has been added');
      }
      form.resetFields();
    } catch (error: unknown) {
      setFormError('We seem to be having trouble adding your event, please try again later');
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitUpdateForm = async (data: any, id: number) => {
    setIsSubmitting(true);
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const response = await axios.put(`${API}${eventsEndpoint}/${id}`, { data }, { headers });
      if (response.status === 200) {
        setFormIsSubmitted('This event has been updated');
      }
      form.resetFields();
    } catch (error: unknown) {
      setFormError('We seem to be having trouble saving the changes, please try again later');
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteEvent = async (id: number) => {
    setIsDeleting(true);
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const response = await axios.delete(`${API}${eventsEndpoint}/${id}`, { headers: headers });
      if (response.status === 200) {
        setFormIsSubmitted('This event has been deleted');
      }
      form.resetFields();
    } catch (error: unknown) {
      setFormError('We seem to be having trouble deleting this event, please try again later');
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    formIsSubmitted,
    formError,
    isSubmitting,
    submitForm,
    submitUpdateForm,
    deleteEvent,
    isDeleting,
  };
};

export default useSubmitEvent;
