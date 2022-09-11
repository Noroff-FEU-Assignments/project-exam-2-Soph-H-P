import { MapContainer } from 'react-leaflet';
import styled from 'styled-components';

export const StyledMapContainer = styled(MapContainer)`
  border-radius: 10px;
  height: 250px;
  width: 100%;

  .leaflet-control-attribution.leaflet-control {
    font-size: 0.4rem;
  }
`;
