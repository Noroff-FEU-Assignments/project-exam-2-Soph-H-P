import { PageContainer } from '../components/layout/PageContainer/index.styled';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserState } from '../context/UserContext';
import EditSightingsForm from '../components/forms/EditSightingsForm';
import MetaData from '../components/common/MetaData';

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
    <PageContainer $containsForm={true} $hasBird={1300}>
      <MetaData
        title="Edit sighting | Birds of Østfold"
        description="As admin you can edit user sightnigs, here you can change the species, the image and the description."
      />
      {id && <EditSightingsForm sightingId={id} />}
    </PageContainer>
  );
};

export default EditSighting;
