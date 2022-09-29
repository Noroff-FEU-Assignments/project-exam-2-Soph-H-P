import React from 'react';
import ErrorSvg from '../../../svgs/ErrorSvg';
import { StyledMessage } from './index.styled';
import fallingBird from '../../../imgs/fallingBird.gif';
import ImageWithWrapper from '../ImageWithWrapper';

/**
 * ApiErrorMessage takes a message string and displays it to
 * the user with a error icon. It optionally displays a funny gif
 * @param {Object} props
 * @param {string} props.message a message to simply describe the nature of the error
 * @param {string | undefined} props.hasGif true displays a gif
 * @example <ApiErrorMessage message="There seems to have been an error" hasGif={true}/>
 * @returns {React.ReactElement}
 */

const ApiErrorMessage = ({
  message,
  hasGif,
}: {
  message: string;
  hasGif?: boolean;
}): React.ReactElement => {
  return (
    <>
      <StyledMessage>
        <ErrorSvg />
        <h2>{message}</h2>
      </StyledMessage>
      {hasGif && (
        <ImageWithWrapper height="" width="400px" src={fallingBird} alt={'bird crash landing'} />
      )}
    </>
  );
};

export default ApiErrorMessage;
