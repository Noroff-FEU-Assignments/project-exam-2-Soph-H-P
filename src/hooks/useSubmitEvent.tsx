import { FormInstance } from 'antd';
import axios from 'axios';
import { Dispatch, useState } from 'react';

import API, { eventsEndpoint } from '../constants/api';
import { useAuthState } from '../context/AuthContext';
import useCheckUnauthorizedUser from './useCheckUnauthorizedUser';
import { EventInterface } from './useEvents';

/**
 * useSubmitEvent returns a number of functions
 * submitForm which handles adding a new event and also sets the visible events so the
 * user can see it instantly
 * submitUpdateform allows updates the current event with new data from the user
 * deleteEvent deletes the event
 * @example submitForm(data, setVisibleEvents)
 * @param {FormInstance} form the form which is being submitted
 * @returns { formIsSubmitted, formError, isSubmitting, submitForm, submitUpdateForm, deleteEvent, isDeleting}
 */

const useSubmitEvent = (
  form: FormInstance,
): {
  formIsSubmitted: string | null;
  formError: string | null;
  isSubmitting: boolean;
  submitForm: (
    data: any,
    setVisibleEvents: Dispatch<React.SetStateAction<EventInterface[] | null | undefined>>,
  ) => Promise<void>;
  submitUpdateForm: (data: any, id: number) => Promise<void>;
  deleteEvent: (id: number) => Promise<void>;
  isDeleting: boolean;
} => {
  const [formIsSubmitted, setFormIsSubmitted] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { authToken } = useAuthState();
  const { checkUnauthorizedUser } = useCheckUnauthorizedUser();

  const submitForm = async (
    data: any,
    setVisibleEvents: Dispatch<React.SetStateAction<EventInterface[] | null | undefined>>,
  ) => {
    setIsSubmitting(true);
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const response = await axios.post(API + eventsEndpoint, { data }, { headers });
      if (response.status === 200) {
        setVisibleEvents(
          visibleEvents => visibleEvents && [...visibleEvents, response.data.data],
        );
      }
      form.resetFields();
    } catch (error) {
      checkUnauthorizedUser(
        error,
        setFormError,
        'We seem to be having trouble adding your event, please try again later',
      );
    } finally {
      setIsSubmitting(false);
      setFormIsSubmitted('This event has been saved')
    }
  };

  const submitUpdateForm = async (data: any, id: number) => {
    setIsSubmitting(true);
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const response = await axios.put(
        `${API}${eventsEndpoint}/${id}`,
        { data },
        { headers },
      );
      if (response.status === 200) {
        setFormIsSubmitted('This event has been updated');
      }
      form.resetFields();
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

  const deleteEvent = async (id: number) => {
    setIsDeleting(true);
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const response = await axios.delete(`${API}${eventsEndpoint}/${id}`, {
        headers: headers,
      });
      if (response.status === 200) {
        setFormIsSubmitted('This event has been deleted');
      }
      form.resetFields();
    } catch (error) {
      checkUnauthorizedUser(
        error,
        setFormError,
        'We seem to be having trouble deleting this event, please try again later',
      );
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
