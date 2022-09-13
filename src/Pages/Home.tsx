import { PageContainer } from '../components/layout/PageContainer/index.styled';
import SightingsGrid from '../components/layout/SightingsGrid';
import StickySightingsMapContainer from '../components/layout/StickySightingsMapContainer';

const Home = () => {
  return (
    <PageContainer style={{ flexDirection: 'row' }}>
      <SightingsGrid />
      <StickySightingsMapContainer />
    </PageContainer>
  );
};

export default Home;
