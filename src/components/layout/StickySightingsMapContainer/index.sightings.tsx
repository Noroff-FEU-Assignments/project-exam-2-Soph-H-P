import styled from 'styled-components';
import theme from '../../../styles/theme';

export const StickyContainer = styled.div`
  padding: 10px;
  background: ${theme.colors.primaryHighlightColor};
  border-radius: 10px;
  width: 40%;

  & > div {
    position: sticky;
    top: 10px;
    width: 100%;
  }
`;
