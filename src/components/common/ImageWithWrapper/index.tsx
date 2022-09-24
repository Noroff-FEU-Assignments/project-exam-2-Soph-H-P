import React from 'react';
import { StyledImageWrapper } from './index.styled';

const ImageWithWrapper = ({
  src,
  alt,
  height,
  width,
}: {
  src: string;
  alt: string;
  height: string;
  width: string;
}) => {
  return (
    <StyledImageWrapper $height={height} $width={width}>
      <img src={src} alt={alt} />
    </StyledImageWrapper>
  );
};

export default ImageWithWrapper;
