import styled from 'styled-components';

import theme from '../../../styles/theme';

export const StyledMessage = styled.div`
  display: flex;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;

  h2 {
    padding: 20px;
    color: ${theme.colors.primaryColor};
  }

  svg {
    height: 28px;
    width: 28px;
    margin: 20px 10px;
    color: ${theme.colors.primaryColor};
    flex-shrink: 0;
  }

  @media (min-width: 700px) {
    font-size: 18px;
  }
`;
