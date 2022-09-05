import { Button, Dropdown, Space } from 'antd';
import { useUserState } from '../../../context/UserContext';
import { useAuthState } from '../../../context/AuthContext';
import DownArrowSvg from '../../../svgs/DownArrowSvg';
import menu from '../DropdownMenu';
import { NavLinksContainer, StyledNavLink } from './index.styled';

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
      <Dropdown overlay={menu} placement="bottomLeft">
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
        {authToken ? 'Logout' : 'Login'}
        {userInfo ? userInfo.username : ''}
      </StyledNavLink>
    </NavLinksContainer>
  );
};

export default NavigationLinks;
