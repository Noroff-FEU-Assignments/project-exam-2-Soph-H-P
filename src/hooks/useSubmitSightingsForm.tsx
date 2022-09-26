import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import API, { sightingsEndpoint } from '../constants/api';

import axios from 'axios';
import { FormInstance, UploadFile } from 'antd';
import useUploadImage from './useUploadImage';
import { LatLngLiteral } from 'leaflet';
import useNearestLocation from './useNearestLocation';

const useSubmitSightingsForm = (
  form: FormInstance,
  setFileList: Dispatch<SetStateAction<UploadFile<any>[]>>,
  setPosition: Dispatch<React.SetStateAction<LatLngLiteral | null>>,
  position: LatLngLiteral | null
) => {
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { uploadImage } = useUploadImage();
  const { location, findNearestLocation, locationError } = useNearestLocation();

  useEffect(() => {
    if (position) {
      findNearestLocation(position.lat, position.lng);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  const submitForm = async (data: any, image: File | undefined) => {
    setIsSubmitting(true);
    if (location) {
      //adds nearest location to the sighting
      data.nearestLocation = location;
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
          'We seem to be having trouble sending your sighting at the moment, please try again later'
        );
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    } else if (locationError) {
      setFormError(
        'We seem to be having trouble sending your sighting at the moment, please try again later'
      );
    }
  };

  return { formIsSubmitted, formError, isSubmitting, submitForm };
};

export default useSubmitSightingsForm;
