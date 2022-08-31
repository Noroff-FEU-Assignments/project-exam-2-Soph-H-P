import styled from 'styled-components';
import theme from '../../../styles/theme';

export const StyledForm = styled.form`
  max-width: 500px;
  margin: 0px auto;
  background: ${theme.colors.brightWhite};
  border-radius: 20px;
  padding: 40px;

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
`;

export const StyledSubmitButton = styled.button``;

export const FormError = styled.span``;
