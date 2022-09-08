import { useState } from 'react';
import API, { addSightingUrlEndpoint, uploadImageUrlEndpoint } from '../constants/api';

import axios from 'axios';
import { FormInstance } from 'antd';
import useUploadImage from './useUploadImage';

const useSubmitSightingsForm = (form: FormInstance) => {
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { imageIsUploaded, uploadError, isUploading, uploadImage } = useUploadImage();
  const submitForm = async (data: any, image: File | undefined) => {
    setIsSubmitting(true);
    // const convertToFormData = (data: any) => {
    //   const formData = new FormData();
    //   Object.keys(data).forEach((key) => formData.append(key, data[key]));
    //   // if (image) {
    //   //   formData.append('photos', image, image.name);
    //   // }
    //   return formData;
    // };
    // const body = convertToFormData(data);

    // data = {
    //   ...data,
    //   photos: {},
    // };
    try {
      // const response = await axios.post(API + addSightingUrlEndpoint, { data });
      // console.log(response);
      // // const sightingId = await response.data.data.id;
      // // console.log(sightingId);
      // // console.log(data.photo.fileList[0]);
      // // uploadImage(data.photo.fileList[0].originFileObj, sightingId);
      // if (response.status === 200) {
      //   setFormIsSubmitted(true);
      //   // form.resetFields();
      // }
      if (image) {
        axios
          .post(API + addSightingUrlEndpoint, { data })
          .then((res) => {
            console.log(res.data);
            console.log('LOOK HERE');
            console.log(res.data.data.id);
            return res.data.data.id;
          })
          .then((refId) => {
            const formData = new FormData();
            formData.append('files', image);
            formData.append('refId', refId);
            formData.append('ref', 'api::sighting.sighting');
            formData.append('field', 'photos');
            return axios.post(API + uploadImageUrlEndpoint, formData);
          })
          .then((res) => console.log(res.data));
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
