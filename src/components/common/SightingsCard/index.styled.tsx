import styled, { css } from 'styled-components';
import theme from '../../../styles/theme';
import noImage from '../../../imgs/noImage.png';

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

export const ImageWrapper = styled.div<{ $height: number; $noImage: boolean }>`
  height: ${({ $height }) => $height}px;
  width: 100%;
  object-fit: cover;
  overflow: hidden;
  border-radius: 10px;
  background: url(${noImage}) center / cover no-repeat;
  position: relative;
  margin-bottom: 10px;

  ${({ $noImage }) =>
    $noImage &&
    css`
      &::after {
        content: 'No image available';
        position: absolute;
        top: 20px;
        left: 25px;
        font-size: 21px;
        color: ${theme.colors.brightWhite};
      }
    `}

  img {
    width: 100%;
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

  a {
    text-decoration: underline;
  }

  a:hover {
    color: ${theme.colors.primaryColor};
  }
`;
