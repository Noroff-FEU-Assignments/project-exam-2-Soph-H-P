import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import BinocularsIcon from '../../../svgs/BinocularsIcon';
import RecentIcon from '../../../svgs/RecentIcon';

import { CtaContainer } from './index.styled';

/**
 * This is a cta component that displays a message and a button
 * the default reroutes the user to the add sightings page
 * using the toHome prop the user will be rerouted home
 *
 * @param {Object} props
 * @param {boolean | undefined} props.toHome if true takes the user home
 * @example
 *  returns cta to send the user to the homepage
 *  <Cta toHome={true}/>
 * @example 
 * returns cta that sends the user to the add sightings page
 * <Cta />
 * @returns {React.ReactElement}
 */

const Cta = ({ toHome }: { toHome?: boolean }): React.ReactElement => {
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
