import { reverseLocationToken, reverseLocationUrl } from '../constants/api';

/**
 * creates a url that contains longitude and latitude to be used
 * to fetch the nearest location to the point on the map
 * @param {number} lat
 * @param {number} lng
 * @example createReverseLocationUrl(11.123324, 15.345345)
 * @returns {string}
 */
const createReverseLocationUrl = (lat: number, lng: number): string => {
  return `${reverseLocationUrl}?lat=${lat}&lon=${lng}&format=json&apiKey=${reverseLocationToken}`;
};

export default createReverseLocationUrl;
