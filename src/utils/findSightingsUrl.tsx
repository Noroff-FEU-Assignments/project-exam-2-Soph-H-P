import API, {
  andFilterPublicOnly,
  andFilterVarified,
  andSortByDate,
  includingImagesQuery,
  sightingsEndpoint,
} from '../constants/api';
import { UserInterface } from '../context/UserContext';

const findSightingsUrl = (
  userInfo: UserInterface | null,
  pageNumber: number,
  numberToShow: number
): string => {
  const paginationEndpoint = `pagination[page]=${pageNumber}&pagination[pageSize]=${numberToShow}`;

  if (!userInfo) {
    return `${API}${sightingsEndpoint}?${includingImagesQuery}&${andSortByDate}&${andFilterVarified}&${andFilterPublicOnly}&${paginationEndpoint}`;
  }
  return `${API}${sightingsEndpoint}?${includingImagesQuery}&${andSortByDate}&${andFilterVarified}&${paginationEndpoint}`;
};

export default findSightingsUrl;
