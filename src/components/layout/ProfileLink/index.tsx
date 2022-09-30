import React from 'react';
import ProfileSvg from '../../../svgs/ProfileSvg';
import { ProfileContainer } from './index.styled';
import { ProfileInterface } from '../../../context/UserContext';

/**
 * Creates an element that displays a profile icon and and the username of the user
 * only to be displayed if the user is logged ins
 *
 * @param { ProfileInterface | null} userInfo
 * @example <ProfileLink userInfo={userInfo} />
 * @returns {React.ReactElement}
 */

const ProfileLink = ({ userInfo }: { userInfo: ProfileInterface | null }): React.ReactElement => {
  return (
    <ProfileContainer>
      <ProfileSvg />
      <span>{userInfo?.username}</span>
    </ProfileContainer>
  );
};

export default ProfileLink;
