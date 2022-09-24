import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer/index.styled';
import SightingsGrid from '../components/layout/SightingsGrid';
import { useUserState } from '../context/UserContext';

const ModerateSightings = () => {
  const { userInfo } = useUserState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || userInfo?.userRole !== 'admin') {
      navigate('/');
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <PageContainer>
      <SightingsGrid moderation={true} title={'Moderate Sightings'} />
    </PageContainer>
  );
};

export default ModerateSightings;
