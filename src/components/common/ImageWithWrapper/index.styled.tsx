import styled, { css } from 'styled-components';
import theme from '../../../styles/theme';
import noImage from '../../../imgs/noImage.png';

export const StyledImageWrapper = styled.div<{
  $height: string;
  $width: string;
  $noImage?: boolean;
}>`
  height: max-content;
  max-height: ${({ $height }) => $height};
  width: ${({ $width }) => $width};
  max-width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto 10px auto;
  background: url(${noImage}) center / cover no-repeat;

  img {
    width: auto;
    height: auto;
    object-fit: cover;
  }

  ${({ $noImage, $height, $width }) =>
    $noImage &&
    css`
      height: ${$height};
      width: ${$width};

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
