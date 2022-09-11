import React from 'react';
import ProfileSvg from '../../../svgs/ProfileSvg';
import { ProfileContainer } from './index.styled';
import { UserInterface } from '../../../context/UserContext';

const ProfileLink = ({ userInfo }: { userInfo: Partial<UserInterface | null> }) => {
  return (
    <ProfileContainer>
      <ProfileSvg />
      <span>{userInfo?.username}</span>
    </ProfileContainer>
  );
};

export default ProfileLink;
