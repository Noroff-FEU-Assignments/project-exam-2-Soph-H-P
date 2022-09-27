import { PageContainer } from '../components/layout/PageContainer/index.styled';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserState } from '../context/UserContext';
import EditUserForm from '../components/forms/EditUserForm';
import MetaData from '../components/common/MetaData';

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
      <MetaData
        title="Edit user | Birds of Østfold"
        description="As admin you can edit users, here you can grant admin access and change usernames."
      />
      {id && <EditUserForm userId={id} />}
    </PageContainer>
  );
};

export default EditUsers;
