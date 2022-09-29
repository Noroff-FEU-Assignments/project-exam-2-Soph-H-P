import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../components/common/MetaData';
import { PageContainer } from '../components/layout/PageContainer/index.styled';
import SightingsGrid from '../components/layout/SightingsGrid';
import StickySightingsMapContainer from '../components/layout/StickySightingsMapContainer';
import { useAuthState } from '../context/AuthContext';

/**
 * Main page component for the users personal sightings, this page should
 * only be accessed by registered users and will therefore reroute 
 * any users that are not logged in.
 * @example <MySightings />
 * @returns {React.ReactElement}
 */

const MySightings = (): React.ReactElement => {
  const navigate = useNavigate();
  const { authToken } = useAuthState();

  useEffect(() => {
    if (!authToken) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  return (
    <PageContainer $isSplit={true} style={{ width: '100%' }}>
      <MetaData
        title="My sightings | Birds of Østfold"
        description="Have a look at all the birds you have seen and recorded here"
      />
      <SightingsGrid mySightings={true} title={'My sightings'} />
      <StickySightingsMapContainer isMySightings={true} />
    </PageContainer>
  );
};

export default MySightings;
