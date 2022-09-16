const API = 'https://bird-finder-norway-api.herokuapp.com/api';
export const sendContactFormUrl =
  'https://soph-web-dev.eu/bug-blog/wp-json/contact-form-7/v1/contact-forms/104/feedback';

export const accessTokenUrlEndpoint = '/auth/local';
export const registerUrlEndpoint = '/auth/local/register';
export const sightingsEndpoint = '/sightings';
export const uploadImageUrlEndpoint = '/upload/';
export const birdsOnlyUrl = `${API}${sightingsEndpoint}?fields[0]=species`;

export const includingImagesQuery = 'populate=photos';
export const andSortByDate = 'sort=date%3Adesc';
export const andFilterVarified = 'filters[varified][$eq]=true';
export const andFilterUnvarified = 'filters[varified][$eq]=false';
export const andFilterPublicOnly = 'filters[public][$eq]=true';

export const reverseLocationToken = '4021193592d34d90ad859fc38004b934';
export const reverseLocationUrl = 'https://api.geoapify.com/v1/geocode/reverse';

export default API;
