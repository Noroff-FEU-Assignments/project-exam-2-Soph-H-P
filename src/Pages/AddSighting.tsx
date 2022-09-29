import MetaData from '../components/common/MetaData';
import SightingsForm from '../components/forms/SightingsForm';
import { PageContainer } from '../components/layout/PageContainer/index.styled';

/**
 * Add sighting component creates add sighting page
 * @example <AddSighting />
 * @returns {React.ReactElement}
 */

const AddSighting = (): React.ReactElement => {
  return (
    <PageContainer $containsForm={true} $hasBird={1300}>
      <MetaData
        title="Add sighting | Birds of Østfold"
        metaDescription="Add a recent sighting of a bird here this will help others to see what you have been up to, and also perhaps also see this bird."
      />
      <SightingsForm />
    </PageContainer>
  );
};

export default AddSighting;
