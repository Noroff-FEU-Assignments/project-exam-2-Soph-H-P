import { StyledImageWrapper } from './index.styled';

const ImageWithWrapper = ({
  src,
  alt,
  height,
  width,
  noImage,
}: {
  src: string;
  alt: string;
  height: string;
  width: string;
  noImage?: boolean;
}) => {
  return (
    <StyledImageWrapper $height={height} $width={width} $noImage={noImage}>
      <img src={src} alt={alt} />
    </StyledImageWrapper>
  );
};

export default ImageWithWrapper;
