const createSearchQuery = (searchValue: string[] | null) => {
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
