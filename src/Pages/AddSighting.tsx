import MetaData from '../components/common/MetaData';
import SightingsForm from '../components/forms/SightingsForm';
import { PageContainer } from '../components/layout/PageContainer/index.styled';

const AddSighting = () => {
  return (
    <PageContainer $containsForm={true} $hasBird={true}>
      <MetaData
        title="Add sighting | Birds of Østfold"
        description="Add a recent sighting of a bird here this will help others to see what you have been up to, and also perhaps also see this bird."
      />
      <SightingsForm />
    </PageContainer>
  );
};

export default AddSighting;
