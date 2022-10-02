import { Drawer } from 'antd';
import { useEffect, useState } from 'react';

import theme from '../../../styles/theme';
import CloseSvg from '../../../svgs/CloseSvg';
import MenuSvg from '../../../svgs/MenuSvg';
import RoundButton from '../../common/buttons/RoundButton';
import Logo from '../Logo';
import { DesktopNavigationLinks, MobileNavigationLinks } from '../NavigationLinks';
import { DesktopNav, MobileNav, NavContainer, StyledLogo } from './index.styled';

/**
 * Creates an navigation for mobile and desktop displaying the correct type after listening
 * to the window width.
 * isOpen state either displays or hides the mobile menu on click
 * @example <Navagation />
 * @returns {React.ReactElement}
 */

const Navagation = (): React.ReactElement => {
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
    <NavContainer>
      <StyledLogo to="/" onClick={() => setIsOpen(false)} aria-label="home">
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
            drawerStyle={{
              backgroundColor: theme.colors.primaryColor,
              padding: '80px 0px 30px 0px',
            }}
            headerStyle={{ display: 'none' }}
            style={{ top: '0px' }}
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
          <DesktopNavigationLinks />
        </DesktopNav>
      )}
    </NavContainer>
  );
};

export default Navagation;
