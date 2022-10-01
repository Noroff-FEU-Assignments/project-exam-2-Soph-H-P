import API, {
  andFilterUnvarified,
  andSortByDate,
  includingImagesQuery,
  sightingsEndpoint,
} from '../constants/api';
import { ProfileInterface } from '../context/UserContext';
import findMySightingsUrl from './findMySightingsUrl';
import findSightingsUrl from './findSightingsUrl';

const createPaginationSightingUrl = (
  pageNumber: number,
  numberToShow: number,
  userInfo: ProfileInterface | null,
  moderation?: boolean,
  mySightings?: boolean
): string => {
  if (moderation) {
    return `${API}${sightingsEndpoint}?${includingImagesQuery}&${andSortByDate}&${andFilterUnvarified}&pagination[page]=${pageNumber}&pagination[pageSize]=${numberToShow}`;
  }

  if (mySightings && userInfo) {
    return findMySightingsUrl(userInfo.user, pageNumber, numberToShow);
  }

  return findSightingsUrl(userInfo, pageNumber, numberToShow);
};

export default createPaginationSightingUrl;
