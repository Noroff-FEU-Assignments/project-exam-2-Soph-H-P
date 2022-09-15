import styled from 'styled-components';

export const StyledGridContainer = styled.div<{ $moderation?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: fit-content;

  justify-items: center;
  width: ${({ $moderation }) => ($moderation ? '100%' : '60%')};
`;
