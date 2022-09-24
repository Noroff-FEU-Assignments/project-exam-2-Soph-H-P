import ImageWithWrapper from '../components/common/ImageWithWrapper';
import PageTitle from '../components/common/typography/PageTitle';
import { PageContainer } from '../components/layout/PageContainer/index.styled';
import owl from '../imgs/owl.jpg';

const NotFound = () => {
  return (
    <PageContainer $hasBird={true} $notFullHeight={true}>
      <PageTitle>Page Not Found</PageTitle>
      <ImageWithWrapper src={owl} alt="hiding owl" width="250px" height="400px" />
    </PageContainer>
  );
};

export default NotFound;
