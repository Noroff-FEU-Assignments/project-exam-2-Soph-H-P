import StarSvg from '../../../svgs/StarSvg';
import { StyledMembersOnlyTag } from './index.styled';

/**
 * Creates a tag that shows if a sighting is members only
 *
 * @param {Object} props
 * @param {boolean} props.isLongView whether the long or short version should be displayed
 * @example <MemebersOnly isLongView={isLongView} />
 * returns a star icon and the words members only
 * @returns {React.ReactElement}
 */

const MemebersOnly = ({ isLongView }: { isLongView?: boolean }): React.ReactElement => {
  return (
    <StyledMembersOnlyTag>
      <StarSvg />
      {isLongView && <p>Members Only</p>}
    </StyledMembersOnlyTag>
  );
};

export default MemebersOnly;
