import React from 'react';
import theme from '../../../../styles/theme';
import { StyledButton } from './index.styled';

const RoundButton = ({
  color = theme.colors.primaryColor,
  icon,
  onClick,
  type,
  danger,
}: {
  color?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  type: 'link' | 'text' | 'default' | 'ghost' | 'primary' | 'dashed' | undefined;
  danger?: boolean;
}) => {
  return (
    <StyledButton
      onClick={onClick}
      $color={color}
      shape="circle"
      icon={icon}
      size={'large'}
      type={type}
      danger={danger}
    />
  );
};

export default RoundButton;
