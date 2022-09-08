import Loader from '../components/common/Loader';
import { PageContainer } from '../components/layout/PageContainer/index.styled';

const Home = () => {
  return (
    <PageContainer>
      <Loader size={400} light={true} />
    </PageContainer>
  );
};

export default Home;
