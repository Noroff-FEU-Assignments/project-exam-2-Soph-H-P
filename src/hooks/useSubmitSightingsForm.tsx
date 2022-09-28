import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import API, { sightingsEndpoint } from '../constants/api';

import axios from 'axios';
import { FormInstance, UploadFile } from 'antd';
import useUploadImage from './useUploadImage';
import { LatLngLiteral } from 'leaflet';
import useNearestLocation from './useNearestLocation';
import { useAuthState } from '../context/AuthContext';
import useCheckUnauthorizedUser from './useCheckUnauthorizedUser';

const useSubmitSightingsForm = (
  form: FormInstance,
  setFileList: Dispatch<SetStateAction<UploadFile<File>[]>>,
  setPosition?: Dispatch<React.SetStateAction<LatLngLiteral | null>>,
  position?: LatLngLiteral | null
) => {
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { uploadImage } = useUploadImage();
  const { location, findNearestLocation, locationError } = useNearestLocation();
  const { authToken } = useAuthState();
  const { checkUnauthorizedUser } = useCheckUnauthorizedUser();

  useEffect(() => {
    if (position) {
      findNearestLocation(position.lat, position.lng);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  const submitForm = async (data: any, image?: File) => {
    setIsSubmitting(true);
    if (location && setPosition) {
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
        checkUnauthorizedUser(
          error,
          setFormError,
          'We seem to be having trouble sending your sighting at the moment, please try again later'
        );
      } finally {
        setIsSubmitting(false);
      }
    } else if (locationError) {
      setFormError(
        'We seem to be having trouble sending your sighting at the moment, please try again later'
      );
    }
  };

  const updateSighting = async (data: any, sightingId: number, image?: File) => {
    setIsSaving(true);

    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const response = await axios.put(
        `${API}${sightingsEndpoint}/${sightingId} `,
        { data },
        { headers }
      );
      if (image) {
        await uploadImage(image, response.data.data.id);
        setFileList([]);
      }
      setFormIsSubmitted(true);
    } catch (error: unknown) {
      checkUnauthorizedUser(
        error,
        setFormError,
        'We seem to be having trouble sending your sighting at the moment, please try again later'
      );
    } finally {
      setIsSaving(false);
    }
  };

  return { formIsSubmitted, formError, isSubmitting, submitForm, updateSighting, isSaving };
};

export default useSubmitSightingsForm;
