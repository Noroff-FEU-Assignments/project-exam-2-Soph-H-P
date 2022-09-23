import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer/index.styled';
import SightingsGrid from '../components/layout/SightingsGrid';
import { useAuthState } from '../context/AuthContext';

const MySightings = () => {
  const navigate = useNavigate();
  const { authToken } = useAuthState();
  if (!authToken) {
    navigate('/');
  }

  return (
    <PageContainer>
      <SightingsGrid mySightings={true} title={'My sightings'} />
    </PageContainer>
  );
};

export default MySightings;
