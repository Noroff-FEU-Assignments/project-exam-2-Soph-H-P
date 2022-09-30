import { SightingInterface } from '../hooks/useSightings';

const findImageUrl = (sighting: SightingInterface) => {
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
