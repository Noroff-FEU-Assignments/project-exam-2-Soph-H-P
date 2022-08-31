import React from 'react';
import LogoImage from '../../../svgs/LogoImage';
import { LogoContainer } from './index.styled';

const Logo = () => {
  return (
    <LogoContainer>
      <LogoImage />
      <h1>Birds of Østfold</h1>
    </LogoContainer>
  );
};

export default Logo;
