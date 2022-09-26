import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer/index.styled';
import SightingsGrid from '../components/layout/SightingsGrid';
import StickySightingsMapContainer from '../components/layout/StickySightingsMapContainer';
import { useAuthState } from '../context/AuthContext';

const MySightings = () => {
  const navigate = useNavigate();
  const { authToken } = useAuthState();
  if (!authToken) {
    navigate('/');
  }

  return (
    <PageContainer $isSplit={true} style={{ width: '100%' }}>
      <SightingsGrid mySightings={true} title={'My sightings'} />
      <StickySightingsMapContainer isMySightings={true} />
    </PageContainer>
  );
};

export default MySightings;
