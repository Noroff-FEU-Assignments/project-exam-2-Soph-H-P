import CheckSvg from '../../../svgs/CheckSvg';
import CloseSvg from '../../../svgs/CloseSvg';
import { StyledFormMessage } from './index.styled';

/**
 * Form Message component displays a message to the user
 * there are two states, error or success
 *
 * @param {Object} props
 * @param {boolean} props.error if true will display red with a cross if false green with a check
 * @param {React.ReactNode} props.children this will be the content of the message
 * @example
 * <FormMessage>Your message has been sent. Please expect a reply in 2 - 3 working days.</FormMessage>
 * @returns {React.ReactElement}
 */

const FormMessage = ({
  error,
  children,
}: {
  error?: boolean;
  children: React.ReactNode;
}): React.ReactElement => {
  return (
    <StyledFormMessage $error={error}>
      {error ? <CloseSvg /> : <CheckSvg />}
      {children}
    </StyledFormMessage>
  );
};

export default FormMessage;
