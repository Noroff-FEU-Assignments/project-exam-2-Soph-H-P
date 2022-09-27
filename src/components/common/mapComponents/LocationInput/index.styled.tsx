import { MapContainer, Marker } from 'react-leaflet';
import styled from 'styled-components';

export const StyledMapContainer = styled(MapContainer)<{
  $height?: number | string;
  $disabled?: boolean;
}>`
  border-radius: 10px;
  height: ${({ $height }) => ($height ? $height : 250)}px;
  width: 100%;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'grab')};

  .leaflet-control-attribution.leaflet-control {
    font-size: 0.4rem;
  }
`;

export const StyledMarker = styled(Marker)<{ $color?: number }>`
  opacity: ${({ $color }) => ($color ? $color : 1)};
`;
