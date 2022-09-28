import styled, { css } from 'styled-components';
import theme from '../../../styles/theme';
import noImage from '../../../imgs/noImage.png';

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
