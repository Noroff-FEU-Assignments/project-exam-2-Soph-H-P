import { Dispatch, SetStateAction, useState } from 'react';
import API, { sightingsEndpoint } from '../constants/api';

import axios from 'axios';
import { FormInstance, UploadFile } from 'antd';
import useUploadImage from './useUploadImage';
import { LatLngLiteral } from 'leaflet';
import useNearestLocation from './useNearestLocation';

const useSubmitSightingsForm = (
  form: FormInstance,
  setFileList: Dispatch<SetStateAction<UploadFile<any>[]>>,
  setPosition: Dispatch<React.SetStateAction<LatLngLiteral | null>>
) => {
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { uploadImage } = useUploadImage();
  const { location, findNearestLocation, locationError } = useNearestLocation();

  const submitForm = async (data: any, image: File | undefined) => {
    setIsSubmitting(true);

    try {
      //finds and adds nearest location to the sighting
      findNearestLocation(data.lat, data.lng);
      data.nearestLocation = location;
      if (!locationError) {
        const response = await axios.post(API + sightingsEndpoint, { data });
        console.log(response);
        if (image) {
          await uploadImage(image, response.data.data.id);
          setFileList([]);
          setPosition(null);
        }
        setFormIsSubmitted(true);
        form.resetFields();
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
