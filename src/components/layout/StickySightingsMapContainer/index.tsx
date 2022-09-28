import API, { andFilterVarified, andSortByDate, sightingsEndpoint } from '../../../constants/api';
import { useUserState } from '../../../context/UserContext';
import createMySightingsEndpoint from '../../../utils/createMySightingsEndpoint';
import createPastDayQuery from '../../../utils/createPastDayQuery';
import Cta from '../../common/Cta';
import MapWithLocationPoints from '../../mapComponents/MapWithLocationPoints';
import { StickyContainer } from './index.sightings';

const StickySightingsMapContainer = ({ isMySightings }: { isMySightings?: boolean }) => {
  const { userInfo } = useUserState();
  const url = `${API}${sightingsEndpoint}?${andSortByDate}&${andFilterVarified}&${createPastDayQuery()}`;


  const findMySightingsUrl = () => {
    if (userInfo?.id) {
      return `${API}${sightingsEndpoint}?${andSortByDate}&${andFilterVarified}&${createMySightingsEndpoint(
        userInfo.id
      )}`;
    }
  };


  return (
    <StickyContainer>
      <div>
        <Cta />
        <MapWithLocationPoints
          url={isMySightings ? findMySightingsUrl() : url}
          title={isMySightings ? 'My sightings' : 'Sightings in the last 24 hours'}
          height={400}
        />
      </div>
    </StickyContainer>
  );
};

export default StickySightingsMapContainer;
