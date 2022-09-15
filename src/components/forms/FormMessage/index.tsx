import CheckSvg from '../../../svgs/CheckSvg';
import CloseSvg from '../../../svgs/CloseSvg';
import { StyledFormMessage } from './index.styled';

const FormError = ({ error, children }: { error?: boolean; children: React.ReactNode }) => {
  return (
    <StyledFormMessage $error={error}>
      {error ? <CloseSvg /> : <CheckSvg />}
      {children}
    </StyledFormMessage>
  );
};

export default FormError;
