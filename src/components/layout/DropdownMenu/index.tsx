import { Menu } from 'antd';
import AddSvg from '../../../svgs/AddSvg';
import BinocularsSvg from '../../../svgs/BinocularsSvg';
import MapIcon from '../../../svgs/MapIcon';
import ModerateSvg from '../../../svgs/ModerateSvg';
import { StyledNavLink } from '../NavigationLinks/index.styled';

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <StyledNavLink
            to="/sightings-map"
          >
            <MapIcon />
            Sightings Map
          </StyledNavLink>
        ),
      },
      {
        key: '2',
        label: (
          <StyledNavLink
            to="/add-sighting"
          >
            <AddSvg />
            Add Sighting
          </StyledNavLink>
        ),
      },
      {
        key: '3',
        label: (
          <StyledNavLink
            to="/my-sightings"
          >
            <BinocularsSvg />
            My Sightings
          </StyledNavLink>
        ),
      },
      {
        key: '4',
        label: (
          <StyledNavLink
            to="/admin/moderate-sightings"
          >
            <ModerateSvg />
            Moderate Sightings
          </StyledNavLink>
        ),
      },
    ]}
  />
);

export default menu;
