import styled from 'styled-components';

export const StyledButton = styled.button<{$color: string}>`
  outline: none;
  height: 43px;
  width: 43px;
  border-radius: 50%;
  background-color: ${({$color}) => $color};
`;
