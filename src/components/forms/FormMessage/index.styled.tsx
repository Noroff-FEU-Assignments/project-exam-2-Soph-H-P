import styled from 'styled-components';

import theme from '../../../styles/theme';

export const StyledFormMessage = styled.span<{ $error?: boolean }>`
  font-size: 18px;
  margin: 30px 0px 20px 0px;
  padding: 10px;
  background-color: ${({ $error }) =>
    $error ? theme.colors.errorColor : theme.colors.primaryColor};
  border-radius: 7px;
  color: ${theme.colors.brightWhite};
  display: flex;
  align-items: center;

  svg {
    height: 50px;
    width: 50px;
    margin-right: 20px;
  }

  a {
    text-decoration: underline;
    margin-left: 20px;
    color: ${theme.colors.brightWhite};
  }

  a:hover {
    color: ${theme.colors.primaryColor};
    text-decoration: none;
  }
`;
