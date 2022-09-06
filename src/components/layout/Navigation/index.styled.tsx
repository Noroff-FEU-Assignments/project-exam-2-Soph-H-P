import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavContainer = styled.div<{ $windowWidth: number }>`
  display: flex;
  justify-content: space-between;
`;

export const DesktopNav = styled.nav``;

export const MobileNav = styled.nav`
  display: flex;
  align-items: center;
  padding-right: 5px;
`;

export const StyledLogo = styled(NavLink)`
  @media (max-width: 700px) {
    width: 100%;
  }
`;
