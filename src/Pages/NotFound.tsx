import ImageWithWrapper from '../components/common/ImageWithWrapper';
import MetaData from '../components/common/MetaData';
import PageTitle from '../components/common/typography/PageTitle';
import { PageContainer } from '../components/layout/PageContainer/index.styled';
import owl from '../imgs/owl.jpg';

const NotFound = () => {
  return (
    <PageContainer $hasBird={true} $notFullHeight={true}>
      <MetaData
        title="Not found | Birds of Østfold"
        description="Looks like the page you are looking for doesn't exist"
      />
      <PageTitle>Page Not Found</PageTitle>
      <ImageWithWrapper src={owl} alt="hiding owl" width="250px" height="400px" />
    </PageContainer>
  );
};

export default NotFound;
