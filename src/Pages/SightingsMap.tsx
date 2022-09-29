import MapWithSearch from '../components/mapComponents/MapWithSearch';
import MetaData from '../components/common/MetaData';
import { PageContainer } from '../components/layout/PageContainer/index.styled';

/**
 * Main page component for the Sightings map, this page currently renders a
 * map component with search
 * @example <SightingsMap />
 * @returns {React.ReactElement}
 */

const SightingsMap = (): React.ReactElement => {
  return (
    <PageContainer $hasBird={false} style={{ padding: 0, margin: 0, position: 'relative' }}>
      <MetaData title="Sightings map | Birds of Østfold" metaDescription="Map pinpointing bird sightings in your local area" />
      <MapWithSearch />
    </PageContainer>
  );
};

export default SightingsMap;
