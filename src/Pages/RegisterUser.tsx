import MetaData from '../components/common/MetaData';
import RegisterForm from '../components/forms/RegisterForm';
import { PageContainer } from '../components/layout/PageContainer/index.styled';

/**
 * Main page component for the Regisering as a user,
 * renders a register user form
 * @example <RegisterUser />
 * @returns {React.ReactElement}
 */

const RegisterUser = (): React.ReactElement => {
  return (
    <PageContainer $containsForm={true} $hasBird={true}>
      <MetaData
        title="Register | Birds of Østfold"
        metaDescription="Register here to keep a track of your sightings and see sightings that are only available for members"
      />
      <RegisterForm />
    </PageContainer>
  );
};

export default RegisterUser;
