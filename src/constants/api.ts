const API = 'https://bird-finder-norway-api.herokuapp.com/api';
export const sendContactFormUrl =
  'https://soph-web-dev.eu/bug-blog/wp-json/contact-form-7/v1/contact-forms/104/feedback';

export const accessTokenUrlEndpoint = '/auth/local';
export const registerUrlEndpoint = '/auth/local/register';
export const sightingsEndpoint = '/sightings';
export const uploadImageUrlEndpoint = '/upload/';
export const includingImagesQuery = 'populate=photos';
export const birdsOnlyUrl = `${API}${sightingsEndpoint}?fields[0]=species`;

export const andSortByDate = 'sort=date%3Adesc';
export const andFilterVarified = 'filters[varified][$eq]=true';
export const andFilterUnvarified = 'filters[varified][$eq]=false';
export const andFilterPublicOnly = 'filters[public][$eq]=true';

export const createPastDayQuery = () => {
  const currentDate = new Date().toISOString();
  const yesterdaysDate = new Date(Date.now() - 86400 * 1000).toISOString();
  return `&filters[date][$lt]=${currentDate}&filters[date][$gt]=${yesterdaysDate}`;
};

const reverseLocationToken = '4021193592d34d90ad859fc38004b934';
const reverseLocationUrl = 'https://api.geoapify.com/v1/geocode/reverse';

export const createReverseLocationUrl = (lat: number, lng: number) => {
  return `${reverseLocationUrl}?lat=${lat}&lon=${lng}&format=json&apiKey=${reverseLocationToken}`;
};

export const createSearchQuery = (searchValue: string[] | null) => {
  if (searchValue) {
    let searchString = '';
    searchValue.forEach((value, index) => {
      const newFilter = `&filters[$or][${index}][species][$eq]=${value}`;
      searchString = searchString + newFilter;
    });
    return searchString;
  } else {
    return '';
  }
};

export default API;
