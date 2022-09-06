import { Menu } from 'antd';
import AddSvg from '../../../svgs/AddSvg';
import BinocularsSvg from '../../../svgs/BinocularsSvg';
import MapIcon from '../../../svgs/MapIcon';
import ModerateSvg from '../../../svgs/ModerateSvg';
import { StyledNavLink } from '../NavigationLinks/index.styled';

const menuItems = [
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

export const DropdownMenuItems = (userRole: string) => {
  const itemsArray = menuItems.filter((item) => item.visibility.includes(userRole));

  return <Menu items={itemsArray} />;
};

