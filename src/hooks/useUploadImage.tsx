import { useState } from 'react';
import API, { addSightingUrlEndpoint, uploadImageUrlEndpoint } from '../constants/api';

import axios from 'axios';

const useUploadImage = () => {
  const [imageIsUploaded, setImageIsUploaded] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const uploadImage = async (data: any, sightingId: string) => {
    setIsUploading(true);
    console.log(data);
    const convertToFormData = (data: any) => {
      const formData = new FormData();
      formData.append('files', data);
      formData.append('refId', sightingId);
      formData.append('ref', 'sightings');
      formData.append('field', 'photos');
      return formData;
    };
    const body = convertToFormData(data);

    try {
      const response = await axios.post(API + uploadImageUrlEndpoint, body);
      console.log(response);
      if (response.status === 200) {
        setImageIsUploaded(true);
        // form.resetFields();
      }
    } catch (error: unknown) {
      setUploadError(
        'We seem to be having trouble uploading your image at the moment, please try again later'
      );
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  return { imageIsUploaded, uploadError, isUploading, uploadImage };
};

export default useUploadImage;
