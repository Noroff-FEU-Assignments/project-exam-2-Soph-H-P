import styled from 'styled-components';

export const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: row;

  & > div {
    width: 325px;
  }

  & > div:first-child {
    margin-right: 30px;
  }

  @media (max-width: 800px) {
    & > div {
      margin: 0px 10px;
      width: 280px;
    }
  }

  @media (max-width: 700px) {
    flex-direction: column;

    & > div {
      width: 100%;
      margin: 0px;
    }

    & > div:first-child {
      margin-right: 0px;
    }
  }
`;
