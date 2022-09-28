import styled, { css } from 'styled-components';

export const StyledGridContainer = styled.div<{ $moderation?: boolean }>`
  display: grid;
  height: fit-content;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fit, minmax(max(260px, 200px), 1fr));
  gap: 10px;

  h1 {
    width: 100%;
  }

  ${({ $moderation }) =>
    $moderation &&
    css`
      @media (min-width: 1000px) {
        grid-template-columns: repeat(auto-fit, minmax(max(260px, 200px), 300px));
      }
    `}
`;

export const SightingsContainer = styled.div<{ $moderation?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 60%;

  ${({ $moderation }) =>
    $moderation &&
    css`
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    `}
`;
