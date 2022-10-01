import API, { andSortByDate, includingSightings, profileUrlEndpoint } from '../constants/api';

const findMySightingsUrl = (profileId: string): string => {
  return `${API}${profileUrlEndpoint}/${profileId}?${includingSightings}&${andSortByDate}`;
};

export default findMySightingsUrl;
