import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../components/common/MetaData';
import { PageContainer } from '../components/layout/PageContainer/index.styled';
import SightingsGrid from '../components/layout/SightingsGrid';
import { useUserState } from '../context/UserContext';

/**
 * Main page component for the Moderating sightings, this page should
 * only be accessed by admin users and with therefore reroute all non-
 * admin users to the home page
 * @example <ModerateSightings />
 * @returns {React.ReactElement}
 */

const ModerateSightings = (): React.ReactElement => {
  const { userInfo } = useUserState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || userInfo?.userRole !== 'admin') {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <PageContainer style={{ width: '100%' }}>
      <MetaData
        title="Moderate sightings | Birds of Østfold"
        description="Here as an admin you are able to accept or reject incoming sightings. This gives you full control"
      />
      <SightingsGrid moderation={true} title={'Moderate Sightings'} />
    </PageContainer>
  );
};

export default ModerateSightings;
