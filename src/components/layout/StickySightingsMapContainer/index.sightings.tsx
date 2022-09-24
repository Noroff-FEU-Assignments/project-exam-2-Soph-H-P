import styled from 'styled-components';
import theme from '../../../styles/theme';

export const StickyContainer = styled.div`
  padding: 10px;
  background: ${theme.colors.primaryHighlightColor};
  border-radius: 10px;
  width: 40%;
  margin-left: 20px;

  & > div {
    position: sticky;
    top: 10px;
    width: 100%;
  }

  @media (max-width: 700px) {
    margin-left: 0px;
    margin-top: 20px;
  }
`;
