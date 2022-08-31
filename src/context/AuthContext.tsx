import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = React.createContext([null, () => {}]);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useLocalStorage('auth', null);

  return <AuthContext.Provider value={[authToken, setAuthToken]}>{children}</AuthContext.Provider>;
};

export default AuthContext;
