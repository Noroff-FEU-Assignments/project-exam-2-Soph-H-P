import API, { andSortByDate, includingSightings, profileUrlEndpoint } from '../constants/api';

/**
 * creates a url used to get sightings for a particular user
 * @param {string} profileId
 * @returns {string}
 */
const findMySightingsUrl = (profileId: string): string => {
  return `${API}${profileUrlEndpoint}/${profileId}?${includingSightings}&${andSortByDate}`;
};

export default findMySightingsUrl;
