import styled from 'styled-components';

export const StyledImageWrapper = styled.div<{ $height: string; $width: string }>`
  height: ${({ $height }) => $height};
  width: ${({ $width }) => $width};
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
  }
`;
