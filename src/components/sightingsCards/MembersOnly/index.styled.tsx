import styled from 'styled-components';
import theme from '../../../styles/theme';

export const StyledMembersOnlyTag = styled.div`
  position: absolute;
  background: ${theme.colors.tertiaryColor};
  color: ${theme.colors.brightWhite};
  border-radius: 5px;
  top: 5px;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;

  p {
    margin: 0px 5px;
    font-size: 16px;
    font-weight: 300;
  }

  svg {
    height: 18px;
    width: 18px;
    margin: 5px;
  }
`;
