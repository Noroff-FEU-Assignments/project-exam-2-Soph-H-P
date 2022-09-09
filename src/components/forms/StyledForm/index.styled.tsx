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

  .ant-input {
    font-weight: 300;
    padding: 15px;
  }

  .ant-input-affix-wrapper {
    padding: 15px;
  }

  .ant-space.ant-space-vertical {
    width: 100%;
  }

  button[type="submit"] {
    margin: 0 auto;
  }
`;

export const StyledSubmitButton = styled.button``;

export const FormError = styled.span``;
