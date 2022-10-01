import { useState } from 'react';
import API, { uploadImageUrlEndpoint } from '../constants/api';

import axios from 'axios';
import { useAuthState } from '../context/AuthContext';
import useCheckUnauthorizedUser from './useCheckUnauthorizedUser';

/**
 * useUploadImage returns two functions
 * uploadImage which handles adding a new image to the media library and the connecting it to the
 * the correct sighting
 * deleteImage deletes the image from the media library
 * @example uploadImage(image, sightingId)
 * @returns { imageIsUploaded, uploadError, isUploading, uploadImage, deleteImage, imageIsDeleted, deleteError, isDeleting}
 */

const useUploadImage = (): {
  imageIsUploaded: boolean;
  uploadError: string | null;
  isUploading: boolean;
  uploadImage: (image: any, sightingId: string) => Promise<void>;
  isDeleting: boolean;
  deleteImage: (imageId: number) => Promise<void>;
  imageIsDeleted: boolean;
  deleteError: string | null;
} => {
  const [imageIsUploaded, setImageIsUploaded] = useState(false);
  const [imageIsDeleted, setImageIsDeleted] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { authToken } = useAuthState();
  const { checkUnauthorizedUser } = useCheckUnauthorizedUser();

  const uploadImage = async (image: any, sightingId: string) => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('files', image);
      formData.append('refId', sightingId);
      formData.append('ref', 'api::sighting.sighting');
      formData.append('field', 'photos');

      const imageUploadResponse = await axios.post(API + uploadImageUrlEndpoint, formData);

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

  const deleteImage = async (imageId: number) => {
    setIsDeleting(true);
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    try {
      const imageDeleteResponse = await axios.delete(
        `${API}${uploadImageUrlEndpoint}files/${imageId}`,
        { headers }
      );

      if (imageDeleteResponse.status === 200) {
        setImageIsDeleted(true);
      }
    } catch (error: unknown) {
      checkUnauthorizedUser(
        error,
        setDeleteError,
        'We seem to be having trouble uploading your image at the moment, please try again later'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    imageIsUploaded,
    uploadError,
    isUploading,
    uploadImage,
    deleteImage,
    isDeleting,
    imageIsDeleted,
    deleteError,
  };
};

export default useUploadImage;
