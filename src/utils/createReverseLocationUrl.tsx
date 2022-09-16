import { reverseLocationToken, reverseLocationUrl } from "../constants/api";

const createReverseLocationUrl = (lat: number, lng: number) => {
    return `${reverseLocationUrl}?lat=${lat}&lon=${lng}&format=json&apiKey=${reverseLocationToken}`;
  };
  
export default createReverseLocationUrl