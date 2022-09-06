import { Drawer } from 'antd';
import { useEffect, useState } from 'react';
import theme from '../../../styles/theme';
import CloseSvg from '../../../svgs/CloseSvg';
import MenuSvg from '../../../svgs/MenuSvg';
import RoundButton from '../../common/buttons/RoundButton';
import Logo from '../Logo';
import { DesktopNavigationLinks, MobileNavigationLinks } from '../NavigationLinks';

import { StyledLogo, NavContainer, MobileNav, DesktopNav } from './index.styled';

const Navagation = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);

  const handleResizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow);
    return () => window.removeEventListener('resize', handleResizeWindow);
  }, []);

  return (
    <NavContainer $windowWidth={windowWidth}>
      <StyledLogo to="/"  onClick={() => setIsOpen(false)} aria-label="home">
        <Logo />
      </StyledLogo>

      {windowWidth <= 700 && (
        <MobileNav>
          <RoundButton
            type="primary"
            icon={!isOpen ? <MenuSvg /> : <CloseSvg />}
            onClick={() => setIsOpen(!isOpen)}
          />
          <Drawer
            drawerStyle={{ backgroundColor: theme.colors.primaryColor, padding: '30px 0px' }}
            headerStyle={{ display: 'none' }}
            style={{ top: '50px' }}
            placement="right"
            onClose={() => setIsOpen(false)}
            visible={isOpen}
          >
            <MobileNavigationLinks setIsOpen={setIsOpen} />
          </Drawer>
        </MobileNav>
      )}
      {windowWidth >= 701 && (
        <DesktopNav>
          <DesktopNavigationLinks setIsOpen={setIsOpen} />
        </DesktopNav>
      )}
    </NavContainer>
  );
};

export default Navagation;
