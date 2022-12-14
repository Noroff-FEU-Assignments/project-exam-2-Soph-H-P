import React, { createContext, Dispatch, SetStateAction, useContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

export interface ProfileInterface {
  user: number;
  userRole: string;
  username: string;
  profileId: string;
}

export interface UserInterface {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  id: number;
  provider: string;
  sightings: number | null;
  updatedAt: string;
  username: string;
  userRole: string;
}

const UserContext = createContext({
  userInfo: {} as ProfileInterface | null,
  setUserInfo: {} as Dispatch<SetStateAction<ProfileInterface | null>>,
});

const UserStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useLocalStorage('user', null);
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserState = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('UserContext must be used within a GlobalStateContext');
  }
  return context;
};

export { UserStateProvider, useUserState };
