import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import { PageContainer } from '../components/layout/PageContainer/index.styled';

const Login = () => {
  return (
    <PageContainer $containsForm={true} $hasBird={true}>
      <LoginForm />
    </PageContainer>
  );
};

export default Login;
