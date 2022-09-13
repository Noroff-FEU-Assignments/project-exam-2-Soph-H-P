import React from 'react';
import { PageContainer } from '../components/layout/PageContainer/index.styled';
import SightingsGrid from '../components/layout/SightingsGrid';

const ModerateSightings = () => {
  return (
    <PageContainer>
      <SightingsGrid moderation={true}></SightingsGrid>
    </PageContainer>
  );
};

export default ModerateSightings;
