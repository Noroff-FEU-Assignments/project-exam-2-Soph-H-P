import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import BinocularsIcon from '../../../svgs/BinocularsIcon';
import { CtaContainer } from './index.styled';

const Cta = () => {
  return (
    <CtaContainer>
      <h3>Share your recent sightings with the community</h3>
      <Link to={'/add-sighting'}>
        <Button size="large" icon={<BinocularsIcon />}>
          Add Sighting
        </Button>
      </Link>
    </CtaContainer>
  );
};

export default Cta;
