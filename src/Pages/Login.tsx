import MetaData from '../components/common/MetaData';
import LoginForm from '../components/forms/LoginForm';
import { PageContainer } from '../components/layout/PageContainer/index.styled';

/**
 * Main page component for the Login page, renders 
 * a login form component
 * 
 * @example <Login />
 * @returns {React.ReactElement}
 */


const Login = (): React.ReactElement => {
  return (
    <PageContainer $containsForm={true} $hasBird={true}>
      <MetaData
        title="Login | Birds of Østfold"
        description="Login here to keep a track of your sightings and see sightings that are only available for members"
      />
      <LoginForm />
    </PageContainer>
  );
};

export default Login;
