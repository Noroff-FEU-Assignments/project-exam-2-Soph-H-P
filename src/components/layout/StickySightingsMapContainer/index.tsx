import Cta from '../../common/Cta';
import MapWithLocationPoints from '../../common/mapComponents/MapWithLocationPoints';
import { StickyContainer } from './index.sightings';

const StickySightingsMapContainer = () => {
  return (
    <StickyContainer>
      <div>
        <Cta />
        <MapWithLocationPoints />
      </div>
    </StickyContainer>
  );
};

export default StickySightingsMapContainer;
