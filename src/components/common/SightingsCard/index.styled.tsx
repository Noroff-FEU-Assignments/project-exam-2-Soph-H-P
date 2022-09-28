import styled, { css } from 'styled-components';
import theme from '../../../styles/theme';

export const StyledCardContainer = styled.div<{ $isVarified: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 260px;
  padding: 10px;
  cursor: pointer;
  height: 100%;
  margin: 10px auto;
  color: ${theme.colors.darkFontColor};
  position: relative;
  overflow: hidden;

  h2 {
    text-transform: capitalize;
    font-size: 20px;
  }

  span {
    font-weight: 700;
    margin-right: 5px;
  }

  &:hover {
    box-shadow: ${theme.effects.cardShadow};
  }

  a:hover {
    color: ${theme.colors.darkFontColor};
  }

  ${({ $isVarified }) =>
    !$isVarified &&
    css`
      border: ${theme.colors.errorColor} 2px solid;

      :before {
        content: 'Pending Moderation';
        font-family: ${theme.text.headingFont};
        position: absolute;
        top: -11px;
        right: -93px;
        width: 250px;
        text-align: center;
        transform: rotate(45deg);
        background: ${theme.colors.errorColor};
        padding: 30px 50px 10px 50px;
        color: ${theme.colors.brightWhite};
        font-size: 17px;
        font-weight: 400;
        z-index: 100;
      }
    `}
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: end;
  margin-bottom: 5px;

  a {
    display: flex;
    align-items: start;
  }

  a {
    text-decoration: underline;
  }

  a:hover {
    color: ${theme.colors.primaryColor};
  }
`;
