import styled, { css } from 'styled-components';
import theme from '../../../styles/theme';
import BackgroundBirdSvg from '../../../svgs/BackgroundBirdSvg.svg';

export const PageContainer = styled.div<{
  $isSplit?: boolean;
  $hasBird?: boolean;
  $containsForm?: boolean;
  $notFullHeight?: boolean;
  $isReversed?: boolean;
}>`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${theme.colors.brightWhite};
  border-radius: 20px;
  margin: 0px auto;
  padding: 20px;

  @media (max-width: 500px) {
    margin: 0px;
    padding: 20px 0px;
  }

  ${({ $containsForm }) =>
    $containsForm &&
    css`
      display: block;
      margin: 0;
      padding: 0;
      background: none;
    `}
  ${({ $notFullHeight }) =>
    $notFullHeight &&
    css`
      height: max-content;
    `}

  ${({ $hasBird, $containsForm }) =>
    $hasBird &&
    css`
      @media (min-width: ${$containsForm ? '1000px' : '1300px'}) {
        &::after {
          content: '';
          position: fixed;
          bottom: 0px;
          left: -15px;
          height: 200px;
          width: 300px;
          background: url(${BackgroundBirdSvg}) bottom left / 300px 200px no-repeat;
        }
      }
    `}



  ${({ $isSplit, $isReversed }) =>
    $isSplit &&
    css`
      flex-direction: row;

      @media (max-width: 700px) {
        flex-direction: ${$isReversed ? 'column-reverse' : 'column'};



        & > div {
          width: 100%;
        }
      }
    `}
`;
