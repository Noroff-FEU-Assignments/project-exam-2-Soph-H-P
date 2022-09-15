import { PageContainer } from '../components/layout/PageContainer/index.styled';
import SightingsGrid from '../components/layout/SightingsGrid';
import StickySightingsMapContainer from '../components/layout/StickySightingsMapContainer';

const Home = () => {
  return (
    <PageContainer $isSplit={true} >
      <SightingsGrid />
      <StickySightingsMapContainer />
    </PageContainer>
  );
};

export default Home;
