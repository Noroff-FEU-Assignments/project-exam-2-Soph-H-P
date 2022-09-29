import { Button, Dropdown, Space } from 'antd';
import { useUserState } from '../../../context/UserContext';
import { useAuthState } from '../../../context/AuthContext';
import DownArrowSvg from '../../../svgs/DownArrowSvg';
import { DropdownMenuItems } from '../DropdownMenu';
import { NavLinksContainer, StyledNavLink } from './index.styled';
import ProfileLink from '../ProfileLink';
import MapIcon from '../../../svgs/MapIcon';
import AddSvg from '../../../svgs/AddSvg';
import BinocularsSvg from '../../../svgs/BinocularsSvg';
import ModerateSvg from '../../../svgs/ModerateSvg';
import { Dispatch, SetStateAction } from 'react';
import RecentSvg from '../../../svgs/RecentSvg';

/**
 * Creates an nav element for desktop displaying the correct links depending on user status
 *
 *
 * @example <DesktopNavigationLinks />
 * @returns {React.ReactElement}
 */

export const DesktopNavigationLinks = (): React.ReactElement => {
  const { authToken } = useAuthState();
  const { userInfo } = useUserState();

  return (
    <NavLinksContainer>
      <Dropdown
        overlay={
          userInfo === null
            ? DropdownMenuItems('public')
            : userInfo.userRole === 'admin'
            ? DropdownMenuItems('admin')
            : DropdownMenuItems('member')
        }
        placement="bottomLeft"
      >
        <Button>
          <Space>
            Sightings <DownArrowSvg />
          </Space>
        </Button>
      </Dropdown>
      <StyledNavLink to="/events">Events</StyledNavLink>
      <StyledNavLink to="/contact">Contact</StyledNavLink>
      <StyledNavLink to="/login">
        {authToken ? <ProfileLink userInfo={userInfo} /> : 'Login'}
      </StyledNavLink>
    </NavLinksContainer>
  );
};

/**
 * Creates an nav element for mobile displaying the correct links depending on user status
 * the setIsOpen state setter allows the menu to be opened and closed from the menu button
 *
 * @param { Dispatch<SetStateAction<boolean>>} setIsOpen
 * @example <MobileNavigationLinks isOpen={isOpen} />
 * @returns {React.ReactElement}
 */

export const MobileNavigationLinks = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}): React.ReactElement => {
  const { authToken } = useAuthState();
  const { userInfo } = useUserState();

  return (
    <NavLinksContainer $isMobile={true}>
      <StyledNavLink to="/" onClick={() => setIsOpen(false)}>
        Recent Sightings
        <RecentSvg />
      </StyledNavLink>
      <StyledNavLink to="/sightings-map" onClick={() => setIsOpen(false)}>
        Sightings Map
        <MapIcon />
      </StyledNavLink>
      <StyledNavLink to="/add-sighting" onClick={() => setIsOpen(false)}>
        Add Sighting
        <AddSvg />
      </StyledNavLink>
      {(userInfo?.userRole === 'member' || userInfo?.userRole === 'admin') && (
        <StyledNavLink to="/my-sightings" onClick={() => setIsOpen(false)}>
          My Sightings
          <BinocularsSvg />
        </StyledNavLink>
      )}
      {userInfo?.userRole === 'admin' && (
        <StyledNavLink to="/admin/moderate-sightings" onClick={() => setIsOpen(false)}>
          Moderate Sightings
          <ModerateSvg />
        </StyledNavLink>
      )}
      <StyledNavLink to="/events" onClick={() => setIsOpen(false)}>
        Events
      </StyledNavLink>
      <StyledNavLink to="/contact" onClick={() => setIsOpen(false)}>
        Contact
      </StyledNavLink>
      <StyledNavLink to="/login" onClick={() => setIsOpen(false)}>
        {authToken ? <ProfileLink userInfo={userInfo} /> : 'Login'}
      </StyledNavLink>
    </NavLinksContainer>
  );
};
