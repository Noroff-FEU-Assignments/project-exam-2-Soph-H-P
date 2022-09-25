import styled from 'styled-components';

export const StyledImageWrapper = styled.div<{ $height: string; $width: string }>`
  height: ${({ $height }) => $height};
  width: ${({ $width }) => $width};
  max-width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto;

  img {
    width: 100%;
  }
`;
