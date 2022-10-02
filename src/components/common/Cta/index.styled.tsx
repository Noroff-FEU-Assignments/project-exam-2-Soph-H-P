import styled from 'styled-components';

import theme from '../../../styles/theme';

export const CtaContainer = styled.div`
  background: ${theme.colors.brightWhite};
  padding: 25px;
  margin-bottom: 20px;
  border-radius: 7px;
  text-align: center;

  button {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    margin: 30px auto 10px auto;
  }

  svg {
    margin-left: 10px;
    height: 20px;
    width: 20px;
  }
`;
