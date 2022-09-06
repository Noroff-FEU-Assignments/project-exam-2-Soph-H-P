import styled, { css } from 'styled-components';

import theme from '../../../styles/theme';

export const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.brightWhite};
  font-family: ${theme.text.headingFont};
  height: 50px;
`;
