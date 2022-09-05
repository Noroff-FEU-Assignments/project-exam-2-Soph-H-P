import styled from 'styled-components';
import theme from '../../../styles/theme';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    font-family: ${theme.text.headingFont};
    font-size: 14px;
  }

  svg {
    height: 28px;
    width: 28x;
    margin-right: 0 !important;
  }
`;
