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
import NotificationsIcon from '../../../svgs/NotificationsIcon';
import RecentSvg from '../../../svgs/RecentSvg';

export const DesktopNavigationLinks = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
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
      {userInfo?.userRole === 'admin' && (
        <StyledNavLink to="/admin/moderate-sightings">
          <NotificationsIcon />
        </StyledNavLink>
      )}
      <StyledNavLink to="/login">
        {authToken ? <ProfileLink userInfo={userInfo} /> : 'Login'}
      </StyledNavLink>
    </NavLinksContainer>
  );
};

export const MobileNavigationLinks = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
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
