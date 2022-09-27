import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApiErrorMessage from '../components/common/ApiErrorMessage';
import Cta from '../components/common/Cta';
import Loader from '../components/common/Loader';
import MetaData from '../components/common/MetaData';
import SingleSightingCard from '../components/common/SingleSightingCard';
import { PageContainer } from '../components/layout/PageContainer/index.styled';
import API, { includingImagesQuery, sightingsEndpoint } from '../constants/api';
import useSingleSighting from '../hooks/useSingleSighting';

const SingleSightingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const url = `${API}${sightingsEndpoint}/${id}?${includingImagesQuery}`;

  const { sighting, isLoading, error } = useSingleSighting(url);

  useEffect(() => {
    if (!id) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (error) {
    return (
      <PageContainer>
        <MetaData title={`Error | Birds of Østfold`} description={error} />
        <ApiErrorMessage message={error} hasGif={true} />
        <Cta toHome={true} />
      </PageContainer>
    );
  }

  if (isLoading) {
    return (
      <PageContainer style={{ minWidth: 300 }}>
        <MetaData
          title="Loading... | Birds of Østfold"
          description="Hang tight we are just loading the page"
        />
        <Loader size={100} light={true} />
      </PageContainer>
    );
  }
  if (sighting) {
    return (
      <PageContainer $hasBird={true} $notFullHeight={true} style={{ maxWidth: 800 }}>
        <MetaData
          title={`${sighting.attributes.species} | Birds of Østfold`}
          description={`Here is the information about the sighting of ${sighting.attributes.species}`}
        />
        <SingleSightingCard sighting={sighting} />
      </PageContainer>
    );
  }
  return null;
};

export default SingleSightingPage;
