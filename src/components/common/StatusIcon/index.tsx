import React from 'react';
import theme from '../../../styles/theme';
import StatusSvg from '../../../svgs/StatusIcon';
import { StyledIconContainer } from './index.styled';

const StatusIcon = ({ status }: { status: string }) => {
  const statusToColor = (status: string) => {
    if (status === 'admin') return theme.statusColors.adminColor;
    if (status === 'novis') return theme.statusColors.novisColor;
    if (status === 'bronze') return theme.statusColors.bronzeColor;
    if (status === 'silver') return theme.statusColors.silverColor;
    if (status === 'gold') return theme.statusColors.goldColor;
    return '';
  };

  return (
    <StyledIconContainer $color={statusToColor(status)}>
      <StatusSvg />
    </StyledIconContainer>
  );
};

export default StatusIcon;
