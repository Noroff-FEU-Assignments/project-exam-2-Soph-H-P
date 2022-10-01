import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApiErrorMessage from '../components/common/ApiErrorMessage';
import Cta from '../components/common/Cta';
import Loader from '../components/common/Loader';
import MetaData from '../components/common/MetaData';
import SingleSightingCard from '../components/sightingsCards/SingleSightingCard';
import { PageContainer } from '../components/layout/PageContainer/index.styled';
import API, { includingImagesQuery, sightingsEndpoint } from '../constants/api';
import useSingleSighting from '../hooks/useSingleSighting';

/**
 * Main page component for displaying singular bird sightings,
 * it collects the id perameter from the url and makes a request to
 * get that specific sighting using the useSingleSighting hook.
 * if there is no id then the user is rerouted to the home page.
 * if there is an error an error message is rendered
 * there is a loading state displaying a loader
 * when the sighting has been retrieved a SightingsCard is rendered
 * @example <SingleSightingPage />
 * @returns {React.ReactElement}
 */

const SingleSightingPage = (): React.ReactElement => {
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
      <PageContainer $notFullHeight={true} style={{ maxWidth: '100%', width: 700 }}>
        <MetaData title={`Error | Birds of Østfold`} metaDescription={error} />
        <ApiErrorMessage message={error} hasGif={true} />
        <Cta toHome={true} />
      </PageContainer>
    );
  }

  if (isLoading) {
    return (
      <PageContainer $notFullHeight={true} style={{ maxWidth: '100%', width: 700, height: 400 }}>
        <MetaData
          title="Loading... | Birds of Østfold"
          metaDescription="Hang tight we are just loading the page"
        />
        <Loader size={100} light={true} />
      </PageContainer>
    );
  }
  if (sighting) {
    return (
      <PageContainer $hasBird={true} $notFullHeight={true} style={{ maxWidth: '100%', width: 700 }}>
        <MetaData
          title={`${sighting.attributes.species} | Birds of Østfold`}
          metaDescription={`Here is the information about the sighting of ${sighting.attributes.species}`}
        />
        <SingleSightingCard sighting={sighting} />
      </PageContainer>
    );
  }
  return (
    <PageContainer $notFullHeight={true} style={{ maxWidth: '100%', width: 700 }}>
      <MetaData title={`Error | Birds of Østfold`} metaDescription={error} />
      <ApiErrorMessage message={'Oops something seems to have gone wrong.'} hasGif={true} />
      <Cta toHome={true} />
    </PageContainer>
  );
};

export default SingleSightingPage;
