import { Form } from 'antd';
import styled, { css } from 'styled-components';
import theme from '../../../styles/theme';

export const StyledForm = styled(Form)<{ $isEventsForm?: boolean; $isUserEdit?: boolean }>`
  width: 500px;
  max-width: 100%;
  margin: 0px auto;
  background: ${theme.colors.brightWhite};
  border-radius: 20px;
  padding: 35px;
  display: flex;
  flex-direction: column;

  fieldset {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .ant-input,
  .ant-picker-input > input,
  label {
    font-size: 18px;
  }

  .ant-picker-input > input {
    font-weight: 300;
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

  .ant-row.ant-form-item-row {
    width: 100%;
    margin-top: 10px;

    .ant-form-item-control-input-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  button {
    margin: 0 auto;
  }

  .ant-switch-handle {
    padding: 10px;
    height: calc(100% - 4px);
    width: 50%;
  }

  .ant-switch-handle::before {
    background: ${theme.colors.primaryColor};
  }

  .ant-switch-handle::after {
    content: 'Members';
    font-size: 18px;
    color: ${theme.colors.brightWhite};
    position: relative;
  }

  .ant-switch {
    width: 100%;
    padding: 10px;
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

  @media (max-width: 500px) {
    padding: 20px;
    width: 100%;

    .ant-switch-checked .ant-switch-handle::after,
    .ant-switch > span,
    .ant-switch-handle::after,
    .ant-input,
    .ant-picker-input > input,
    label {
      font-size: 14px;
    }
  }

  ${({ $isEventsForm }) =>
    $isEventsForm &&
    css`
      width: 40%;
      background: ${theme.colors.primaryHighlightColor};
      margin-left: 10px;

      @media (max-width: 800px) {
        width: 100%;
        margin-left: 10px;
      }

      @media (max-width: 700px) {
        margin-left: 0px;
      }
    `}

  ${({ $isUserEdit }) =>
    $isUserEdit &&
    css`
      .ant-switch-checked .ant-switch-handle::after {
        content: 'Admin';
      }

      .ant-switch-handle::after {
        content: 'Member';
      }
    `}
`;
