import styled from 'styled-components';

export const StyledIconContainer = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
  display: inline-flex;
  align-items: center;
  margin-left: 10px;
`;
