import API, { andFilterVarified, andSortByDate, sightingsEndpoint } from '../../../constants/api';
import { useUserState } from '../../../context/UserContext';
import createPastDayQuery from '../../../utils/createPastDayQuery';
import findMySightingsUrl from '../../../utils/findMySightingsUrl';
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

const StickySightingsMapContainer = ({
  isMySightings,
}: {
  isMySightings?: boolean;
}): React.ReactElement => {
  const { userInfo } = useUserState();
  const url = `${API}${sightingsEndpoint}?${andSortByDate}&${andFilterVarified}&${createPastDayQuery()}`;

  return (
    <StickyContainer>
      <div>
        <Cta />
        {userInfo && (
          <MapWithLocationPoints
            url={isMySightings ? findMySightingsUrl(userInfo.profileId) : url}
            title={isMySightings ? 'My sightings' : 'Sightings in the last 24 hours'}
            height={400}
            isMySightings={isMySightings}
          />
        )}
      </div>
    </StickyContainer>
  );
};

export default StickySightingsMapContainer;
