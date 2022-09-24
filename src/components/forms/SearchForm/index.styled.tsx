import { Form, Select } from 'antd';
import styled from 'styled-components';

export const StyledSelect = styled(Select)`
  width: 270px !important;

  .ant-select-selector {
    padding-right: 30px;
  }
`;

export const StyledSearchForm = styled(Form)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 500;
  display: flex;
  flex-direction: row;
  align-items: center;

  button {
    position: absolute;
    top: 0px;
    right: 4px;
  }
`;
