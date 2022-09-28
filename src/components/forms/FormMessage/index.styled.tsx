import styled from 'styled-components';
import theme from '../../../styles/theme';

export const StyledFormMessage = styled.span<{ $error?: boolean }>`
  font-size: 18px;
  margin: 30px 0px 20px 0px;
  padding: 10px;
  background-color: ${({ $error }) =>
    $error ? theme.colors.errorColor : theme.colors.secondaryHighlightColor};
  border-radius: 7px;
  color: ${({ $error }) => ($error ? theme.colors.brightWhite : theme.colors.darkFontColor)};
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
  }

  a:hover {
    color: ${theme.colors.primaryColor};
    text-decoration: none;
  }
`;
