import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApiErrorMessage from '../components/common/ApiErrorMessage';
import Cta from '../components/common/Cta';
import Loader from '../components/common/Loader';
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

  useEffect(() => {
    if (sighting) {
      document.title = `${sighting.attributes.species} | Birds of Østfold`;
    }
  }, [sighting]);

  if (error) {
    return (
      <PageContainer>
        <ApiErrorMessage message={error} hasGif={true} />
        <Cta toHome={true} />
      </PageContainer>
    );
  }

  if (isLoading) {
    return (
      <PageContainer>
        <Loader size={300} light={true} />
      </PageContainer>
    );
  }
  if (sighting) {
    return (
      <PageContainer $hasBird={true} $notFullHeight={true} style={{ maxWidth: 800 }}>
        <SingleSightingCard sighting={sighting} />
      </PageContainer>
    );
  }
  return null;
};

export default SingleSightingPage;
