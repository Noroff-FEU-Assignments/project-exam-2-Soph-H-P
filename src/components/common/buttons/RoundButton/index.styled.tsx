import { Button } from 'antd';
import styled from 'styled-components';

export const StyledButton = styled(Button)<{ $color: string }>`
  outline: none;
  border: none;
  height: 43px;
  width: 43px;
  background-color: ${({ $color }) => $color};
  display: flex;
  justify-content: center;
  align-items: center;
`;
