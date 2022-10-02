import React, { createContext, Dispatch, SetStateAction, useContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext({
  authToken: {} as string | null,
  setAuthToken: {} as Dispatch<SetStateAction<string | null>>,
});

const AuthStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useLocalStorage('auth', null);
  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthState = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('UserContext must be used within a GlobalStateContext');
  }
  return context;
};

export { AuthStateProvider, useAuthState };
