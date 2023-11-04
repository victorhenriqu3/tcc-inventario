import React, { createContext, useContext, useState } from 'react';
import { getAuthorizationValue } from '../../services/BaseApi';
import { Authorization } from '../../types';


interface AuthContextData {
  signed: boolean;
  user?: Authorization
  // eslint-disable-next-line no-unused-vars
  Login: (authorization: Authorization) => void;
  Logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<Authorization | undefined>(getAuthorizationValue());
  async function Login(userData: Authorization) {
    setUser(userData)
    localStorage.setItem('@App:Authorization', JSON.stringify(userData))
    localStorage.setItem('@App:token', userData.accessToken)

  }

  function Logout() {
    setUser(void 0);
    localStorage.removeItem('@App:token');
    localStorage.removeItem('@App:Authorization')
  }

  const signed = !!user

  return (
    <AuthContext.Provider
      value={{ signed, user, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
