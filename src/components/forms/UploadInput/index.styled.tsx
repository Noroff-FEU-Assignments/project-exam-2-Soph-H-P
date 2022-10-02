import styled from 'styled-components';

export const StyledFormItem = styled.div`
  margin: 15px 0px 24px 0px;

  .ant-upload.ant-upload-select.ant-upload-select-picture-card,
  .ant-upload-list-picture-card-container,
  .ant-upload-list-item.ant-upload-list-item-done.ant-upload-list-item-list-type-picture-card {
    width: 180px;
    height: 180px;
  }

  button {
    min-width: unset;
    margin: opx;
  }

  .ant-upload-list-item-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
