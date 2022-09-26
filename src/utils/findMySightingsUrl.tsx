import API, { andFilterPublicOnly, andFilterVarified, andSortByDate, includingImagesQuery, sightingsEndpoint } from "../constants/api";
import { UserInterface } from "../context/UserContext";
import createMySightingsEndpoint from "./createMySightingsEndpoint";

export const findSightingsUrl = (userInfo: Partial<UserInterface | null>) => {
    if (!userInfo) {
      return `${API}${sightingsEndpoint}?${includingImagesQuery}&${andSortByDate}&${andFilterVarified}&${andFilterPublicOnly}`;
    }
    return `${API}${sightingsEndpoint}?${includingImagesQuery}&${andSortByDate}&${andFilterVarified}`;
  };

const findMySightingsUrl = (userInfo: Partial<UserInterface | null>) => {
  if (userInfo?.id) {
    return `${API}${sightingsEndpoint}?${includingImagesQuery}&${andSortByDate}&${andFilterVarified}&${createMySightingsEndpoint(
      userInfo.id
    )}`;
  }
};

export default findMySightingsUrl;
