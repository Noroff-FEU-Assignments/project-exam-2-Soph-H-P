import API, { andSortByDate, includingImagesQuery, sightingsEndpoint } from '../constants/api';
import { UserInterface } from '../context/UserContext';
import createMySightingsEndpoint from './createMySightingsEndpoint';

const findMySightingsUrl = (
  userId: number,
  pageNumber: number,
  numberToShow: number
): string => {
    const paginationEndpoint = `pagination[page]=${pageNumber}&pagination[pageSize]=${numberToShow}`;

    return `${API}${sightingsEndpoint}?${includingImagesQuery}&${andSortByDate}&${createMySightingsEndpoint(
      userId
    )}&${paginationEndpoint}`;
};

export default findMySightingsUrl;
