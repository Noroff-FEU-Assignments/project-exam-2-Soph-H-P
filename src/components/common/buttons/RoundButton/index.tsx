import React from 'react';
import theme from '../../../../styles/theme';
import { StyledButton } from './index.styled';

/**
 * This is a rounded button with an icon, the colour and style are changable
 *
 * @param {Object} props
 * @param {string} props.color the colour for the background of the button defaults to - theme.colors.primaryColor
 * @param {React.ReactNode} props.icon the icon that will be displayed in the center of the button
 * @param {() => void} props.onClick an onclick function
 * @param {string | undefined} props.type the type of button to select the styling
 * @param {boolean | undefined} props.danger if true returns a red button
 * @example
 * returns a round button that is light green with a cross icon
 * <RoundButton color={theme.colors.primaryHighlightColor} icon={<CheckIconComponent />} onClick={handleClick} danger={false}/>
 *
 * @example
 * returns a round button that has a cross icon is outlined and red
 * <RoundButton color={theme.colors.primaryHighlightColor} icon={<CrossIconComponent />} onClick={handleClick} type="ghost" danger={false}/>
 * @returns {React.ReactElement}
 */

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
}): React.ReactElement => {
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
