import React from 'react';
import RegisterForm from '../components/forms/RegisterForm';
import { PageContainer } from '../components/layout/PageContainer/index.styled';

const RegisterUser = () => {
  return (
    <PageContainer $containsForm={true} $hasBird={true}>
      <RegisterForm />
    </PageContainer>
  );
};

export default RegisterUser;
