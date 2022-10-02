import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import theme from '../../../styles/theme';

export const StyledNavLink = styled(NavLink)`
  font-family: ${theme.text.headingFont};
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.brightWhite} !important;
  padding: 6px 14px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  height: min-content;

  svg {
    margin-right: 10px;
  }

  &:hover,
  &.active,
  &:focus {
    background: ${theme.colors.darkFontColor};
  }
`;

export const NavLinksContainer = styled.div<{ $isMobile?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: end;

  button {
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
    svg {
      width: 18px;
      height: 18px;
    }
  }

  .ant-dropdown-menu-item.ant-dropdown-menu-item-active.ant-dropdown-menu-item-only-child {
    border-radius: 20px !important;
  }

  a:not(:last-child),
  button {
    margin-right: 20px;
  }

  @media (min-width: 700px) and (max-width: 800px) {
    a:not(:last-child),
    button {
      margin-right: 2px;
    }
  }

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      a {
        margin-bottom: 30px;
      }

      flex-direction: column;
      align-items: end;

      svg {
        margin-right: 0px;
        margin-left: 10px;
      }

      a:last-child {
        margin-right: 20px;
      }
    `}
`;
