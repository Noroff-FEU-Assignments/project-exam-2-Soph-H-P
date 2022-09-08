import { useState } from 'react';
import { sendContactFormUrl } from '../constants/api';

import axios from 'axios';
import { FormInstance } from 'antd';

const useSubmitContactForm = (form: FormInstance) => {
  const [messageIsSent, setMessageIsSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const submitForm = async (data: any) => {
    setIsSending(true);
    const convertToFormData = (data: any) => {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      return formData;
    };
    const body = convertToFormData(data);
    try {
      const response = await axios.post(sendContactFormUrl, body);
      if (response.status === 200) {
        setMessageIsSent(true);
        form.resetFields();
      }
    } catch (error: unknown) {
      setFormError(
        'We seem to be having trouble sending your message at the moment, please try again later'
      );
      console.log(error);
    } finally {
      setIsSending(false);
    }
  };

  return { messageIsSent, formError, isSending, submitForm };
};

export default useSubmitContactForm;
