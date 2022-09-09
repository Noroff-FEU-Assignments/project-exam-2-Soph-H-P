import { Dispatch, SetStateAction, useState } from 'react';
import API, { addSightingUrlEndpoint } from '../constants/api';

import axios from 'axios';
import { FormInstance, UploadFile } from 'antd';
import useUploadImage from './useUploadImage';

const useSubmitSightingsForm = (
  form: FormInstance,
  setFileList: Dispatch<SetStateAction<UploadFile<any>[]>>
) => {
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { uploadImage } = useUploadImage();
  const submitForm = async (data: any, image: File | undefined) => {
    setIsSubmitting(true);
    try {
      if (image) {
        const response = await axios.post(API + addSightingUrlEndpoint, { data });
        await uploadImage(image, response.data.data.id);
        setFormIsSubmitted(true);
        form.resetFields();
        setFileList([]);
      }
    } catch (error: unknown) {
      setFormError(
        'We seem to be having trouble sending your message at the moment, please try again later'
      );
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formIsSubmitted, formError, isSubmitting, submitForm };
};

export default useSubmitSightingsForm;
