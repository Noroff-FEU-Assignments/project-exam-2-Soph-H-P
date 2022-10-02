import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import MetaData from '../components/common/MetaData';
import EditUserForm from '../components/forms/EditUserForm';
import { PageContainer } from '../components/layout/PageContainer/index.styled';
import { useUserState } from '../context/UserContext';

/**
 * Main page component for the Edit users page, this is a
 * page that should only be accessed by admin users and therefore
 * will reroute a non admin user back to the homepage.
 * @example <EditUsers />
 * @returns {React.ReactElement}
 */

const EditUsers = (): React.ReactElement => {
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
        metaDescription="As admin you can edit users, here you can grant admin access and change usernames."
      />
      {id && <EditUserForm userId={id} />}
    </PageContainer>
  );
};

export default EditUsers;
