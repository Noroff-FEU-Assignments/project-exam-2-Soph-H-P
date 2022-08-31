import styled from 'styled-components';
import theme from '../../../styles/theme';

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  svg {
    padding-right: 1rem;
  }

  h1 {
    font-size: 24px;
    max-width: 100px;
    margin: 0px;
    color: ${theme.colors.brightWhite};
  }
`;
