import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavContainer = styled.div<{ $windowWidth: number }>`
  display: flex;
  justify-content: space-between;
  margin: 5px;
`;

export const DesktopNav = styled.nav``;

export const MobileNav = styled.nav<{ $isOpen: boolean }>``;

export const StyledLogo = styled(NavLink)``;
