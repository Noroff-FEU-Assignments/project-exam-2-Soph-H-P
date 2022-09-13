import { MapContainer } from 'react-leaflet';
import styled from 'styled-components';

export const StyledMapContainer = styled(MapContainer)<{ $height?: number }>`
  border-radius: 10px;
  height: ${({ $height }) => ($height ? $height : 250)}px;
  width: 100%;

  .leaflet-control-attribution.leaflet-control {
    font-size: 0.4rem;
  }
`;
