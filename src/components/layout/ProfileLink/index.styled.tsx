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
    padding-bottom: 3px;
  }

  svg {
    height: 28px;
    width: 28x !important;
    margin-right: 0 !important;
  }

  @media (max-width: 700px) {
    flex-direction: row-reverse;

    span {
      font-family: ${theme.text.headingFont};
      font-size: 18px;
    }

    svg {
      height: 25px;
      width: 25x;
    }
  }
`;
