import SightingsForm from '../components/forms/SightingsForm';
import { PageContainer } from '../components/layout/PageContainer/index.styled';

const AddSighting = () => {
  return (
    <PageContainer $containsForm={true} $hasBird={true}>
      <SightingsForm />
    </PageContainer>
  );
};

export default AddSighting;
