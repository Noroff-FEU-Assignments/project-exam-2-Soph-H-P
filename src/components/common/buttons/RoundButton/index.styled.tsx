import styled from 'styled-components';
import { Button } from 'antd';

export const StyledButton = styled(Button)<{ $color: string }>`
  outline: none;
  height: 43px;
  width: 43px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  display: flex;
  justify-content: center;
  align-items: center;
`;
