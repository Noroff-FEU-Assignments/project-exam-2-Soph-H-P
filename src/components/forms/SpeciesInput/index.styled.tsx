import { Select } from 'antd';
import styled from 'styled-components';

export const StyledSelect = styled(Select)`
  .ant-select-selector,
  .ant-select-selection-search > input {
    height: 50px !important;
    font-size: 18px;
  }
  .ant-select-selector {
    padding: 10px 11px !important;
  }

  .ant-select-selection-item {
    text-transform: capitalize;
  }

  @media (max-width: 500px) {
    .ant-select-selector,
    .ant-select-selection-search > input {
      font-size: 14px;
    }
  }
`;

export const NotFoundContainer = styled.div`
  text-align: center;
`;
