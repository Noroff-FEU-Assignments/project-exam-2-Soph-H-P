import styled, { css } from 'styled-components';
import theme from '../../../styles/theme';

export const PageContainer = styled.div<{ $isSplit?: boolean }>`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100%;
  background-color: ${theme.colors.brightWhite};
  border-radius: 20px;
  margin: 0px auto;
  padding: 20px;

  @media (max-width: 500px) {
    margin: 0px;
    padding: 10px;
  }

  ${({ $isSplit }) =>
    $isSplit &&
    css`
      flex-direction: row;

      @media (max-width: 700px) {
        flex-direction: column;

        & > div {
          width: 100%;
        }
      }
    `}
`;
