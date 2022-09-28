import MapWithSearch from '../components/mapComponents/MapWithSearch';
import MetaData from '../components/common/MetaData';
import { PageContainer } from '../components/layout/PageContainer/index.styled';

const SightingsMap = () => {
  return (
    <PageContainer $hasBird={false} style={{ padding: 0, margin: 0, position: 'relative' }}>
      <MetaData title="Sightings map | Birds of Østfold" description="" />
      <MapWithSearch />
    </PageContainer>
  );
};

export default SightingsMap;
