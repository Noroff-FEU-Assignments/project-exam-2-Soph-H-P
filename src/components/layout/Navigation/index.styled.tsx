import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DesktopNav = styled.nav`
  padding: 5px;
  display: flex;
`;

export const MobileNav = styled.nav`
  display: flex;
  align-items: center;
  padding-right: 5px;

  button {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 1500;
  }
`;

export const StyledLogo = styled(NavLink)`
  @media (max-width: 700px) {
    width: 100%;
  }
`;
