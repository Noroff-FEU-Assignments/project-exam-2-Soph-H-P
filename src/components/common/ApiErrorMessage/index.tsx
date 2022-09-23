import React from 'react';
import ErrorSvg from '../../../svgs/ErrorSvg';
import { StyledMessage } from './index.styled';

const ApiErrorMessage = ({ message }: { message: string }) => {
  return (
    <StyledMessage>
      <ErrorSvg />
      <h2>{message}</h2>
    </StyledMessage>
  );
};

export default ApiErrorMessage;
