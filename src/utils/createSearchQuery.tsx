/**
 * takes an array of search terms and creates a query string to be used
 * to get the sightings of those particular species
 * returns an empty string if there are no search terms
 * @param {string[] | null} searchValue
 * @returns {string}
 */

const createSearchQuery = (searchValue: string[] | null): string => {
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

export default createSearchQuery;
