import styled from 'styled-components';
import birdSpriteDark from '../../../imgs/birdSpriteDark.png';
import birdSpriteLight from '../../../imgs/birdSpriteLight.png';
import theme from '../../../styles/theme';

export const LoaderContainer = styled.div<{ $size: number; $light?: boolean }>`
  position: relative;
  background: ${({ $light }) =>
    $light ? theme.colors.primaryShadeColor : theme.colors.primaryHighlightColor}};
  height: ${({ $size }) => $size}px;
  width: ${({ $size }) => $size}px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;

  .anticon-spin,
  .anticon-spin::before {
    animation: loadingCircle 2s infinite cubic-bezier(.5,.54,.32,.88);
    right: ${({ $size }) => $size / 16}px;
    top: ${({ $size }) => $size / 16}px;
    position: absolute;
    color: ${theme.colors.primaryColor};
  }
`;

export const AnimatedBird = styled.div<{ $size: number; $light?: boolean }>`
  position: absolute;
  height: 100%;
  width: 100%;
  background: transparent url(${({ $light }) => ($light ? birdSpriteLight : birdSpriteDark)}) 0 0
    no-repeat;
  background-size: cover;
  animation: pullWorm 2s steps(39) infinite;

  @keyframes pullWorm {
    100% {
      background-position: calc(-${({ $size }) => $size}px * 39), 0;
    }
  }
`;
