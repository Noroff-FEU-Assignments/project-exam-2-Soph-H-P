import API, { andFilterVarified, andSortByDate, sightingsEndpoint } from '../../../constants/api';
import { useUserState } from '../../../context/UserContext';
import createMySightingsEndpoint from '../../../utils/createMySightingsEndpoint';
import createPastDayQuery from '../../../utils/createPastDayQuery';
import Cta from '../../common/Cta';
import MapWithLocationPoints from '../../mapComponents/MapWithLocationPoints';
import { StickyContainer } from './index.sightings';

/**
 * Creates an element that sticks to the top as the uer scrolls
 * This contains a map with points of recent sightings
 * if isMySightings then the points on the map will only display those
 * that belong to that user
 *
 * @param { boolean | undefined} isMySightings
 * @example <StickySightingsMapContainer isMySightings={isMySightings} />
 * @returns {React.ReactElement}
 */

const StickySightingsMapContainer = ({ isMySightings }: { isMySightings?: boolean }): React.ReactElement => {
  const { userInfo } = useUserState();
  const url = `${API}${sightingsEndpoint}?${andSortByDate}&${andFilterVarified}&${createPastDayQuery()}`;

  const findMySightingsUrl = () => {
    if (userInfo?.user) {
      return `${API}${sightingsEndpoint}?${andSortByDate}&${andFilterVarified}&${createMySightingsEndpoint(
        userInfo.user
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
