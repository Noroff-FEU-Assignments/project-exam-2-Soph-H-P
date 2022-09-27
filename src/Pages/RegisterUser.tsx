import MetaData from '../components/common/MetaData';
import RegisterForm from '../components/forms/RegisterForm';
import { PageContainer } from '../components/layout/PageContainer/index.styled';

const RegisterUser = () => {
  return (
    <PageContainer $containsForm={true} $hasBird={true}>
      <MetaData
        title="Register | Birds of Østfold"
        description="Register here to keep a track of your sightings and see sightings that are only available for members"
      />
      <RegisterForm />
    </PageContainer>
  );
};

export default RegisterUser;
