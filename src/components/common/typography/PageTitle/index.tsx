import React from 'react';
import { StyledTitle } from './index.styled';

const PageTitle = ({ children }: { children: string }) => {
  return <StyledTitle>{children}</StyledTitle>;
};

export default PageTitle;
