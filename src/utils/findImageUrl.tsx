import { SightingInterface } from '../hooks/useSightings';

/**
 * takes the sighting and finds out whether an image exists, and 
 * if a small image exists to prevent errors where there are no images
 * 
 * @param {SightingInterface} sighting
 * @returns {string}
 */
const findImageUrl = (sighting: SightingInterface): string => {
  const photo = sighting.attributes.photos.data;
  if (photo) {
    if (photo[0].attributes.formats.small) {
      return photo[0].attributes.formats.small.url;
    }
    return photo[0].attributes.url;
  } else {
    return '';
  }
};

export default findImageUrl;
