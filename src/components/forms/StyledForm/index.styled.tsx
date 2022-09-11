import { Form } from 'antd';
import styled from 'styled-components';
import theme from '../../../styles/theme';

export const StyledForm = styled(Form)`
  max-width: 500px;
  margin: 0px auto;
  background: ${theme.colors.brightWhite};
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;

  fieldset {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .ant-input,
  label {
    font-size: 18px;
  }

  .ant-input,
  .ant-picker {
    width: 100%;
    font-weight: 300;
    padding: 15px;
  }

  .ant-input-affix-wrapper {
    padding: 15px;
  }

  button[type='submit'] {
    margin: 0 auto;
  }

  .ant-switch-handle {
    padding: 15px;
    height: calc(100% - 4px);
    width: 50%;
  }

  .ant-switch-handle::before {
    background: ${theme.colors.primaryColor};
  }

  .ant-switch-handle::after {
    content: 'Members only';
    font-size: 18px;
    color: ${theme.colors.brightWhite};
    position: relative;
  }

  .ant-switch {
    width: 100%;
    padding: 15px;
    height: unset;
    border-radius: 10px;
    display: flex;
    justify-content: end;
    background: #f6f6f6;
    border: 1px solid #d9d9d9;

    span {
      width: 50%;
      font-size: 18px;
      font-weight: 300;
      color: ${theme.colors.darkFontColor};
    }
  }

  .ant-switch-checked {
    justify-content: start;
  }

  .ant-switch-checked .ant-switch-handle {
    left: calc(100% - 50% - 2px);
  }

  .ant-switch-checked .ant-switch-handle::after {
    content: 'Public';
    font-size: 18px;
    color: ${theme.colors.brightWhite};
    position: relative;
  }
`;
