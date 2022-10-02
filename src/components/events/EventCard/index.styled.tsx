import styled from 'styled-components';

import theme from '../../../styles/theme';

export const EventCardWrapper = styled.div`
  box-shadow: ${theme.effects.cardShadow};
  width: 375px;
  max-width: 100%;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  margin: 20px auto;
  cursor: pointer;

  span {
    font-weight: 700;
  }

  p {
    margin: 0px;
  }

  h2 {
    text-transform: capitalize;
  }

  &:hover {
    transform: scale(1.05);
    transition: all 0.2s ease;
  }
`;

export const DateContainer = styled.div`
  height: 100px;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto 10px auto 0px;
  background: ${theme.colors.primaryColor};
  color: ${theme.colors.brightWhite};
  border-radius: 10px;

  span {
    font-size: 40px;
    font-weight: 300;
  }

  h3 {
    color: ${theme.colors.brightWhite};
  }
`;
