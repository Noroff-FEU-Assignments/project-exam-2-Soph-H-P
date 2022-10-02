import ImageWithWrapper from '../components/common/ImageWithWrapper';
import MetaData from '../components/common/MetaData';
import { PageContainer } from '../components/layout/PageContainer/index.styled';
import PageTitle from '../components/typography/PageTitle';
import owl from '../imgs/owl.jpg';

/**
 * Main page component for if a page is not found, this displays
 * a message and funny image to the user to show that the page
 * does not exist
 * @example <NotFound />
 * @returns {React.ReactElement}
 */

const NotFound = (): React.ReactElement => {
  return (
    <PageContainer $hasBird={true} $notFullHeight={true}>
      <MetaData
        title="Not found | Birds of Østfold"
        metaDescription="Looks like the page you are looking for doesn't exist"
      />
      <PageTitle>Page Not Found</PageTitle>
      <ImageWithWrapper src={owl} alt="hiding owl" width="250px" height="400px" />
    </PageContainer>
  );
};

export default NotFound;
