import React from 'react';
import { StyledFooter } from './index.styled';

/**
 * Footer renders a footer component
 *
 * @example <Footer />
 * @returns {React.ReactElement}
 */

const Footer = (): React.ReactElement => {
  return <StyledFooter>&copy; Copyright Birds of Østfold 2022</StyledFooter>;
};

export default Footer;
