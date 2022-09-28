import React, { useEffect, useState } from 'react';
import API, {
  andFilterVarified,
  sightingsEndpoint,
} from '../../../constants/api';
import createSearchQuery from '../../../utils/createSearchQuery';
import SearchForm from '../../forms/SearchForm';
import MapWithLocationPoints from '../MapWithLocationPoints';

const MapWithSearch = () => {
  const url = `${API}${sightingsEndpoint}?${andFilterVarified}`;
  const [searchUrl, setSearchUrl] = useState<string>(url);
  const [searchValue, setSearchValue] = useState<string[] | null>(null);

  useEffect(() => {
    const newSearchQuery = createSearchQuery(searchValue);
    setSearchUrl(`${url}${newSearchQuery}`)
  }, [searchValue, url]);

  return (
    <>
      <SearchForm setSearchValue={setSearchValue} />
      <MapWithLocationPoints url={searchUrl} height={'100%'} />
    </>
  );
};

export default MapWithSearch;
