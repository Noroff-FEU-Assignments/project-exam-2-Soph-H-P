import styled from 'styled-components';

export const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(300px, 350px));
  grid-gap: 28px;
  justify-items: center;
  width: 60%;
`;
