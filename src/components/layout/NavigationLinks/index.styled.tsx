import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import theme from '../../../styles/theme';

export const StyledNavLink = styled(NavLink)`
  font-family: ${theme.text.headingFont};
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.brightWhite} !important;
  padding: 6px 14px;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }

  &:hover,
  &.active,
  &:focus {
    background: ${theme.colors.darkFontColor};
  }
`;

export const NavLinksContainer = styled.div`
  display: flex;
  justify-content: center;

  button {
    margin: auto;
    display: flex;
    justify-content: center;
    height: unset;
    border: none;
  }

  button:hover {
    background: ${theme.colors.darkFontColor};
    color: ${theme.colors.brightWhite};
  }

  button:hover svg {
    transform: rotate(180deg);
    transition: transform ease 0.5s;
  }

  .ant-space-item {
    font-family: ${theme.text.headingFont};
    font-size: 18px;
    font-weight: bold;
    display: flex;
    justify-content: center;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;
