import { useState } from 'react';
import API, { uploadImageUrlEndpoint } from '../constants/api';

import axios from 'axios';

const useUploadImage = () => {
  const [imageIsUploaded, setImageIsUploaded] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const uploadImage = async (image: any, sightingId: string) => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('files', image);
      formData.append('refId', sightingId);
      formData.append('ref', 'api::sighting.sighting');
      formData.append('field', 'photos');

      const imageUploadResponse = await axios.post(API + uploadImageUrlEndpoint, formData);
      console.log(imageUploadResponse);
      console.table(formData);

      if (imageUploadResponse.status === 200) {
        setImageIsUploaded(true);
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
