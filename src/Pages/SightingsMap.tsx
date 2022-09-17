import React from 'react';
import MapWithSearch from '../components/common/mapComponents/MapWithSearch';
import { PageContainer } from '../components/layout/PageContainer/index.styled';

const SightingsMap = () => {
  return (
    <PageContainer $hasBird={false} style={{ padding: 0, margin: 0, position: 'relative' }}>
      {/* <PageContainer style={{ padding: '0px', position: 'relative' }}> */}
      <MapWithSearch />
    </PageContainer>
  );
};

export default SightingsMap;
