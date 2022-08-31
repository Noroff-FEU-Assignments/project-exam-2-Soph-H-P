import React from 'react';
import theme from '../../../../styles/theme';
import { StyledButton } from './index.styled';

const RoundButton = ({
  color = theme.colors.primaryColor,
  icon,
  onClick,
}: {
  color?: string;
  icon: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <StyledButton onClick={onClick} $color={color}>
      {icon}
    </StyledButton>
  );
};

export default RoundButton;
