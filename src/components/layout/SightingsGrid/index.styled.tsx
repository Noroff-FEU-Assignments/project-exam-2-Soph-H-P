import styled from 'styled-components';

export const StyledGridContainer = styled.div`
  display: grid;
  height: fit-content;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fit, minmax(max(260px, 200px), 1fr));
  gap: 10px;

  h1 {
    width: 100%;
  }
`;

export const SightingsContainer = styled.div<{ $moderation?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ $moderation }) => ($moderation ? '100%' : '60%')};
`;
