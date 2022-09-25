import { PageContainer } from '../components/layout/PageContainer/index.styled';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserState } from '../context/UserContext';
import EditUserForm from '../components/forms/EditUserForm';

const EditUsers = () => {
  const { id } = useParams();
  const { userInfo } = useUserState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id || !userInfo || userInfo.userRole !== 'admin') {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <PageContainer $containsForm={true} $hasBird={true}>
      {id && <EditUserForm userId={id} />}
    </PageContainer>
  );
};

export default EditUsers;
