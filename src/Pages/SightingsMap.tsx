import React from 'react';
import MapWithSearch from '../components/common/mapComponents/MapWithSearch';
import { PageContainer } from '../components/layout/PageContainer/index.styled';

const SightingsMap = () => {
  return (
    <PageContainer style={{ padding: '0px' }}>
      <MapWithSearch />
    </PageContainer>
  );
};

export default SightingsMap;
