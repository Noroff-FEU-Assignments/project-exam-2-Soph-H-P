import { FormInstance, UploadFile } from 'antd';
import axios from 'axios';
import { LatLngLiteral } from 'leaflet';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import API, { sightingsEndpoint } from '../constants/api';
import { useAuthState } from '../context/AuthContext';
import useCheckUnauthorizedUser from './useCheckUnauthorizedUser';
import useNearestLocation from './useNearestLocation';
import useUploadImage from './useUploadImage';

/**
 * useSubmitSightingsForm returns two functions
 * submitForm which handles adding a new sighting it also uses the response and sighting id
 * to then upload the image if there is one and connect it to the sighting.
 * updateSighting updates the sighting and the image if there is one.
 * @example submitForm(data, setNewSightingId)
 * @param {FormInstance} form the form which is being submitted
 * @param {Dispatch<SetStateAction<UploadFile<File>[]>>} setFileList state setter for images added to sighting
 * @param {Dispatch<React.SetStateAction<LatLngLiteral | null>>} setPosition state setter for adding the position
 * @param {LatLngLiteral | null} position the location coordinates
 * @returns { formIsSubmitted, formError, isSubmitting, submitForm, updateSighting, isSaving}
 */

const useSubmitSightingsForm = (
  form: FormInstance,
  setFileList: Dispatch<SetStateAction<UploadFile<File>[]>>,
  setPosition?: Dispatch<React.SetStateAction<LatLngLiteral | null>>,
  position?: LatLngLiteral | null,
): {
  formIsSubmitted: boolean;
  formError: string | null;
  isSubmitting: boolean;
  submitForm: (
    data: any,
    setNewSightingId: Dispatch<SetStateAction<number | null>>,
    image?: File,
  ) => Promise<void>;
  updateSighting: (data: any, sightingId: number, image?: File) => Promise<void>;
  isSaving: boolean;
} => {
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

  const submitForm = async (
    data: any,
    setNewSightingId: Dispatch<SetStateAction<number | null>>,
    image?: File,
  ) => {
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

        if (response.status === 200) {
          setNewSightingId(response.data.data.id);
        }
        setFormIsSubmitted(true);
        form.resetFields();
      } catch (error) {
        checkUnauthorizedUser(
          error,
          setFormError,
          'We seem to be having trouble sending your sighting at the moment, please try again later',
        );
      } finally {
        setIsSubmitting(false);
      }
    } else if (locationError) {
      setFormError(
        'We seem to be having trouble sending your sighting at the moment, please try again later',
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
        { headers },
      );
      if (image) {
        await uploadImage(image, response.data.data.id);
        setFileList([]);
      }
      setFormIsSubmitted(true);
    } catch (error) {
      checkUnauthorizedUser(
        error,
        setFormError,
        'We seem to be having trouble sending your sighting at the moment, please try again later',
      );
    } finally {
      setIsSaving(false);
    }
  };

  return {
    formIsSubmitted,
    formError,
    isSubmitting,
    submitForm,
    updateSighting,
    isSaving,
  };
};

export default useSubmitSightingsForm;
