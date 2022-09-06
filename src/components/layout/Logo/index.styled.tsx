import styled from 'styled-components';
import theme from '../../../styles/theme';

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;

  svg {
    padding-right: 1rem;
  }

  h1 {
    font-size: 21px;
    line-height: 24px;
    width: 100px;
    margin: 0px;
    color: ${theme.colors.brightWhite};
  }

  @media (max-width: 700px) {
    align-items: end;
    h1 {
      font-size: 18px;
      margin: 0 auto;
      width: auto;
    }

    svg {
      padding-right: 0px;
      width: 40px;
      height: 40px;
    }
  }
`;
