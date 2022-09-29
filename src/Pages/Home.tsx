import MetaData from '../components/common/MetaData';
import { PageContainer } from '../components/layout/PageContainer/index.styled';
import SightingsGrid from '../components/layout/SightingsGrid';
import StickySightingsMapContainer from '../components/layout/StickySightingsMapContainer';

const Home = () => {
  return (
    <PageContainer $isSplit={true} style={{ width: '100%' }}>
      <MetaData
        title="Recent sightings | Birds of Østfold"
        description="Take a look here to see what bird species have been seen most recently and where. This may just help you to spot that elusive species you have been looking for."
      />
      <SightingsGrid title={'Recent Sightings'} />
      {/* <StickySightingsMapContainer /> */}
    </PageContainer>
  );
};

export default Home;
