import { useEffect, useState } from 'react';
import CloseSvg from '../../../svgs/CloseSvg';
import MenuSvg from '../../../svgs/MenuSvg';
import RoundButton from '../../common/buttons/RoundButton';
import Logo from '../Logo';
import NavigationLinks from '../NavigationLinks';

import { StyledLogo, NavContainer, MobileNav, DesktopNav } from './index.styled';

const Navagation = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleResizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow);
    return () => window.removeEventListener('resize', handleResizeWindow);
  }, []);

  const handleOpenMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <NavContainer $windowWidth={windowWidth}>
      <StyledLogo
        to="/"
        onClick={() => {
          if (menuOpen) {
            handleOpenMenu();
          }
        }}
        aria-label="home"
      >
        <Logo />
      </StyledLogo>

      {windowWidth <= 600 && (
        <MobileNav $isOpen={menuOpen}>
          <NavigationLinks handleOpenMenu={handleOpenMenu} menuOpen={menuOpen} />
        </MobileNav>
      )}
      {windowWidth <= 600 && (
        <RoundButton
          onClick={handleOpenMenu}
          icon={menuOpen ? <MenuSvg /> : <CloseSvg />}
        ></RoundButton>
      )}
      {windowWidth >= 601 && (
        <DesktopNav>
          <NavigationLinks handleOpenMenu={handleOpenMenu} menuOpen={menuOpen} />
        </DesktopNav>
      )}
    </NavContainer>
  );
};

export default Navagation;
