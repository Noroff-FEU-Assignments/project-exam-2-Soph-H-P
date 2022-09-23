import styled from 'styled-components';

export const StyledGridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: fit-content;

  h1 {
    width: 100%;
  }
`;

export const SightingsContainer = styled.div<{ $moderation?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ $moderation }) => ($moderation ? '100%' : '60%')};
`;
