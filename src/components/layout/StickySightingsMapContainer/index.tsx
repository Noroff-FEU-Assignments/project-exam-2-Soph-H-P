import API, {
  andFilterVarified,
  andSortByDate,
  createPastDayQuery,
  sightingsEndpoint,
} from '../../../constants/api';
import Cta from '../../common/Cta';
import MapWithLocationPoints from '../../common/mapComponents/MapWithLocationPoints';
import { StickyContainer } from './index.sightings';

const StickySightingsMapContainer = () => {
  const url = `${API}${sightingsEndpoint}?${andSortByDate}&${andFilterVarified}&${createPastDayQuery()}`;
  return (
    <StickyContainer>
      <div>
        <Cta />
        <MapWithLocationPoints url={url} title={'Sightings in the last 24 hours'} height={400} />
      </div>
    </StickyContainer>
  );
};

export default StickySightingsMapContainer;
