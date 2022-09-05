import { Button, Dropdown, Space } from 'antd';
import { useUserState } from '../../../context/UserContext';
import { useAuthState } from '../../../context/AuthContext';
import DownArrowSvg from '../../../svgs/DownArrowSvg';
import { menuAdmin, menuMember, menuPublic } from '../DropdownMenu';
import { NavLinksContainer, StyledNavLink } from './index.styled';
import ProfileLink from '../ProfileLink';

const NavigationLinks = ({
  handleOpenMenu,
  menuOpen,
}: {
  handleOpenMenu: () => void;
  menuOpen: boolean;
}) => {
  const { authToken } = useAuthState();
  const { userInfo } = useUserState();

  console.log(userInfo);

  return (
    <NavLinksContainer>
      <Dropdown
        overlay={
          userInfo === null ? menuPublic : userInfo.userRole === 'admin' ? menuAdmin : menuMember
        }
        placement="bottomLeft"
      >
        <Button>
          <Space>
            Sightings <DownArrowSvg />
          </Space>
        </Button>
      </Dropdown>
      <StyledNavLink
        to="/events"
        onClick={() => {
          if (menuOpen) {
            handleOpenMenu();
          }
        }}
      >
        Events
      </StyledNavLink>
      <StyledNavLink
        to="/contact"
        onClick={() => {
          if (menuOpen) {
            handleOpenMenu();
          }
        }}
      >
        Contact
      </StyledNavLink>
      <StyledNavLink
        to="/login"
        onClick={() => {
          if (menuOpen) {
            handleOpenMenu();
          }
        }}
      >
        {authToken ? <ProfileLink userInfo={userInfo} /> : 'Login'}
      </StyledNavLink>
    </NavLinksContainer>
  );
};

export default NavigationLinks;
