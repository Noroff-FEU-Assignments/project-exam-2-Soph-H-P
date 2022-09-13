import styled from 'styled-components';
import theme from '../../../styles/theme';

export const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 260px;
  padding: 10px;

  h2 {
    text-transform: capitalize;
    font-size: 20px;
  }

  p {
    display: flex;
    align-items: end;
    margin-bottom: 5px;
  }

  span {
    font-weight: 700;
    margin-right: 5px;
  }

  &:hover {
    box-shadow: ${theme.effects.cardShadow};
  }
`;

export const ImageWrapper = styled.div<{ $height: number }>`
  height: ${({ $height }) => $height}px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 10px;

  img {
    height: 100%;
  }
`;
