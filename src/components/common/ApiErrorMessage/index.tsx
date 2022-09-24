import React from 'react';
import ErrorSvg from '../../../svgs/ErrorSvg';
import { StyledMessage } from './index.styled';
import fallingBird from '../../../imgs/fallingBird.gif';
import ImageWithWrapper from '../ImageWithWrapper';

const ApiErrorMessage = ({ message, hasGif }: { message: string; hasGif?: boolean }) => {
  return (
    <>
      <StyledMessage>
        <ErrorSvg />
        <h2>{message}</h2>
      </StyledMessage>
      {hasGif && (
        <ImageWithWrapper height="" width="" src={fallingBird} alt={'bird crash landing'} />
      )}
    </>
  );
};

export default ApiErrorMessage;
