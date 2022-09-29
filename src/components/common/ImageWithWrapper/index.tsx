import { StyledImageWrapper } from './index.styled';

/**
 * This component renders an image within a div
 * it is styled so the image should fit perfectly within the div
 *
 * @param {Object} props
 * @param {string} props.src the url for the image
 * @param {string} props.alt the alt text for the image
 * @param {string} props.height the desired height of the image
 * @param {string} props.width the desired width of the image
 * @param {boolean | undefined} props.noImage in the event there is no image available
 * @example <ImageWithWrapper height="250px" width="400px" src={fallingBird} alt={'bird crash landing'} />
 * @returns {React.ReactElement}
 */
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
}): React.ReactElement => {
  return (
    <StyledImageWrapper $height={height} $width={width} $noImage={noImage}>
      <img src={src} alt={alt} />
    </StyledImageWrapper>
  );
};

export default ImageWithWrapper;
