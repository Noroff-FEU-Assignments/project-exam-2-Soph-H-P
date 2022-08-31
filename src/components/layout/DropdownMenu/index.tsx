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
            onClick={() => {
              // if (menuOpen) {
              //   handleOpenMenu();
              // }
            }}
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
            onClick={() => {
              // if (menuOpen) {
              //   handleOpenMenu();
              // }
            }}
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
            onClick={() => {
              // if (menuOpen) {
              //   handleOpenMenu();
              // }
            }}
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
            onClick={() => {
              // if (menuOpen) {
              //   handleOpenMenu();
              // }
            }}
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
