import { Dispatch, SetStateAction, useState } from 'react';
import API, { sightingsEndpoint } from '../constants/api';

import axios from 'axios';
import { FormInstance, UploadFile } from 'antd';
import useUploadImage from './useUploadImage';
import { LatLngLiteral } from 'leaflet';

const useSubmitSightingsForm = (
  form: FormInstance,
  setFileList: Dispatch<SetStateAction<UploadFile<any>[]>>,
  setPosition: Dispatch<React.SetStateAction<LatLngLiteral | null>>
) => {
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { uploadImage } = useUploadImage();
  const submitForm = async (data: any, image: File | undefined) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(API + sightingsEndpoint, { data });
      if (image) {
        await uploadImage(image, response.data.data.id);
        setFileList([]);
        setPosition(null);
      }
      setFormIsSubmitted(true);
      form.resetFields();
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
