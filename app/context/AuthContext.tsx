'use client';

import React, { createContext, useState } from 'react';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
  password: string;
}

interface State {
  loading: boolean;
  error: null | string;
  data: null | User;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  error: null,
  data: null,
  setAuthState: () => {},
});

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<State>({
    loading: false,
    error: null,
    data: null,
  });

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthContext;
