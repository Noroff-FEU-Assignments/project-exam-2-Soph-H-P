import { PageContainer } from '../components/layout/PageContainer/index.styled';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserState } from '../context/UserContext';
import EditSightingsForm from '../components/forms/EditSightingsForm';

const EditSighting = () => {
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
      {id && <EditSightingsForm sightingId={id} />}
    </PageContainer>
  );
};

export default EditSighting;
