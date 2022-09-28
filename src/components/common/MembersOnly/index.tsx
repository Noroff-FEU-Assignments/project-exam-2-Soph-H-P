import StarSvg from '../../../svgs/StarSvg';
import { StyledMembersOnlyTag } from './index.styled';

const MemebersOnly = ({ isLongView }: { isLongView?: boolean }) => {
  return (
    <StyledMembersOnlyTag>
      <StarSvg />
      {isLongView && <p>Members Only</p>}
    </StyledMembersOnlyTag>
  );
};

export default MemebersOnly;
