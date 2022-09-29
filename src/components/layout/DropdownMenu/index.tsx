import { Menu } from 'antd';
import AddSvg from '../../../svgs/AddSvg';
import BinocularsSvg from '../../../svgs/BinocularsSvg';
import MapIcon from '../../../svgs/MapIcon';
import ModerateSvg from '../../../svgs/ModerateSvg';
import RecentSvg from '../../../svgs/RecentSvg';
import { StyledNavLink } from '../NavigationLinks/index.styled';

const menuItems = [
  {
    key: '0',
    visibility: ['public', 'member', 'admin'],
    label: (
      <StyledNavLink to="/">
        <RecentSvg />
        Recent Sightings
      </StyledNavLink>
    ),
  },
  {
    key: '1',
    visibility: ['public', 'member', 'admin'],
    label: (
      <StyledNavLink to="/sightings-map">
        <MapIcon />
        Sightings Map
      </StyledNavLink>
    ),
  },
  {
    key: '2',
    visibility: ['public', 'member', 'admin'],
    label: (
      <StyledNavLink to="/add-sighting">
        <AddSvg />
        Add Sighting
      </StyledNavLink>
    ),
  },
  {
    key: '3',
    visibility: ['member', 'admin'],
    label: (
      <StyledNavLink to="/my-sightings">
        <BinocularsSvg />
        My Sightings
      </StyledNavLink>
    ),
  },
  {
    key: '4',
    visibility: ['admin'],
    label: (
      <StyledNavLink to="/admin/moderate-sightings">
        <ModerateSvg />
        Moderate Sightings
      </StyledNavLink>
    ),
  },
];

/**
 * Creates an antd menu item for the dropdown menu on desktop adjusts which links are available
 * depending on user status
 *
 * @param {string} userRole
 * @example DropdownMenuItems('public')
 * @returns {React.ReactElement}
 */

export const DropdownMenuItems = (userRole: string): React.ReactElement => {
  const itemsArray = menuItems.filter((item) => item.visibility.includes(userRole));

  return <Menu items={itemsArray} />;
};
