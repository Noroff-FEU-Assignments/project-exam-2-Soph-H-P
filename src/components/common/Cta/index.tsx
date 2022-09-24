import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import BinocularsIcon from '../../../svgs/BinocularsIcon';
import RecentIcon from '../../../svgs/RecentIcon';

import { CtaContainer } from './index.styled';

const Cta = ({ toHome }: { toHome?: boolean }) => {
  if (toHome) {
    return (
      <CtaContainer>
        <h3>Go back to recent sightings</h3>
        <Link to={'/'}>
          <Button size="large" icon={<RecentIcon />}>
            Recent sightings
          </Button>
        </Link>
      </CtaContainer>
    );
  }

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
