'use client';

import axios from 'axios';
import { getCookie } from 'cookies-next';
import React, { createContext, useEffect, useState } from 'react';

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
    loading: true,
    error: null,
    data: null,
  });

  const fetchUser = async () => {
    setAuthState({
      loading: true,
      error: null,
      data: null,
    });

    const jwt = getCookie('jwt');

    if (!jwt) {
      return setAuthState({
        loading: false,
        error: null,
        data: null,
      });
    }
    
    try {
      const response = await axios.get('http://localhost:3000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

      setAuthState({
        loading: false,
        error: null,
        data: response.data,
      });

    } catch (error: any) {
      setAuthState({
        data: null,
        loading: false,
        error: error.response.data.errorMessages,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthContext;
