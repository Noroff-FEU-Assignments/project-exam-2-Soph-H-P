import styled, { css } from 'styled-components';
import theme from '../../../styles/theme';

export const StyledCardContainer = styled.div<{ $isVarified: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 10px;
  position: relative;
  overflow: hidden;

  h2 {
    text-transform: capitalize;
    font-size: 40px;
  }

  p {
    display: flex;
    align-items: end;
    margin-bottom: 5px;
    max-width: 370px;
  }

  span {
    font-weight: 700;
    margin-right: 5px;
  }

  button {
    align-self: end;
    margin-bottom: -10px;
    margin-top: 10px;
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

  @media (max-width: 600px) {
    h2 {
      font-size: 28px;
    }
  }

  @media (max-width: 500px) {
    margin-top: -20px;
  }
`;

export const SplitCard = styled.div`
  display: flex;
  flex-direction: row;
  height: max-content;

  & > div:first-of-type {
    min-width: 60%;
  }

  @media (max-width: 700px) {
    flex-direction: column;

    & > div:first-of-type {
      min-width: 100%;
    }
  }
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
