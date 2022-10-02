import { Modal } from 'antd';
import styled from 'styled-components';

import theme from '../../../styles/theme';

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: ${theme.colors.primaryHighlightColor};
  }

  p {
    font-size: 21px;
  }

  p > span {
    font-weight: 700;
  }

  .ant-btn.ant-btn-ghost.ant-btn-dangerous {
    margin-top: 20px;
  }
`;
