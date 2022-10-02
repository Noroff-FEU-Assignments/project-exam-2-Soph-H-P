import API, {
  andFilterUnvarified,
  andSortByDate,
  includingImagesQuery,
  sightingsEndpoint,
} from '../constants/api';
import { ProfileInterface } from '../context/UserContext';
import findMySightingsUrl from './findMySightingsUrl';
import findSightingsUrl from './findSightingsUrl';

/**
 * creates the correct url for the page with pagination where possible
 * @param {number} pageNumber the page number that should be included
 * @param {number} numberToShow the number of sightings to return
 * @param {ProfileInterface|null} userInfo the users information
 * @param {boolean} moderation? whether the sighting is for moderation
 * @param {boolean} mySightings? if the sightings is to be shown on my sightings
 * @example createPaginationSightingUrl(currentPage, 12, userInfo, moderation, mySightings)
 * returns 'https://bird-finder-norway-api.herokuapp.com/api/sightings?populate=photos&sort=date%3Adesc&filters[varified][$eq]=true&pagination[page]=2&pagination[pageSize]=12'
 * @returns {string}
 */
const createPaginationSightingUrl = (
  pageNumber: number,
  numberToShow: number,
  userInfo: ProfileInterface | null,
  moderation?: boolean,
  mySightings?: boolean,
): string => {
  if (moderation) {
    return `${API}${sightingsEndpoint}?${includingImagesQuery}&${andSortByDate}&${andFilterUnvarified}&pagination[page]=${pageNumber}&pagination[pageSize]=${numberToShow}`;
  }

  if (mySightings && userInfo) {
    return findMySightingsUrl(userInfo.profileId);
  }

  return findSightingsUrl(userInfo, pageNumber, numberToShow);
};

export default createPaginationSightingUrl;
