import React from 'react';
import theme from '../../../styles/theme';
import StatusSvg from '../../../svgs/StatusIcon';
import { StyledIconContainer } from './index.styled';

const StatusIcon = ({ status, userRole }: { status: number; userRole: string }) => {
  const statusToColor = (status: number) => {
    if (userRole === 'admin') {
      return theme.statusColors.adminColor;
    } else if (status <= 5) {
      return theme.statusColors.novisColor;
    } else if (status <= 10) {
      return theme.statusColors.bronzeColor;
    } else if (status <= 20) {
      return theme.statusColors.silverColor;
    } else if (status >= 21) {
      return theme.statusColors.goldColor;
    } else {
      return '';
    }
  };

  return (
    <StyledIconContainer $color={statusToColor(status)}>
      <StatusSvg />
    </StyledIconContainer>
  );
};

export default StatusIcon;
