import styled from 'styled-components';

import theme from '../../../styles/theme';

export const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 260px;
  padding: 10px;
  margin: 10px auto;
  color: ${theme.colors.darkFontColor};
  height: 100%;
  position: relative;

  h2 {
    text-transform: capitalize;
    font-size: 20px;
  }

  p {
    display: flex;
    align-items: end;
    margin-bottom: 5px;
  }

  span {
    font-weight: 700;
    margin-right: 5px;
  }

  &:hover {
    box-shadow: ${theme.effects.cardShadow};
  }

  a {
    text-decoration: underline;
  }

  a:hover {
    color: ${theme.colors.primaryColor};
  }
`;

export const ButtonContainer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-around;
  margin-top: auto;
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: end;
  margin-bottom: 5px;

  a {
    display: flex;
    align-items: start;
  }
`;
