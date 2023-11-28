import { AuthenticationContext } from '@/app/context/AuthContext';
import axios from 'axios';
import { deleteCookie } from 'cookies-next';
import { useContext } from 'react';

const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(AuthenticationContext);

  const signin = async (
    { email, password }: { email: string; password: string },
    handleClose: () => void,
  ) => {
    setAuthState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await axios.post('http://localhost:3000/api/auth/signin', {
        email,
        password,
      });
      setAuthState({ data: response.data, loading: false, error: null });
      handleClose();
    } catch (responseError: any) {
      setAuthState({
        data: null,
        loading: false,
        error: responseError.response.data.errorMessages,
      });
    }
  };

  const singup = async (
    {
      firstName,
      lastName,
      email,
      city,
      phone,
      password,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      city: string;
      phone: string;
      password: string;
    },
    handleClose: () => void,
  ) => {
    setAuthState((prev) => ({ ...prev, loading: true }));

    try {
      await axios.post('http://localhost:3000/api/auth/signup', {
        firstName,
        lastName,
        email,
        city,
        phone,
        password,
      });
      setAuthState((prev) => ({ ...prev, loading: false }));
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        loading: false,
        error: error.response.data.errorMessages,
      });
    }
  };

  const signout = () => {
    deleteCookie('jwt');
    setAuthState({ data: null, loading: false, error: null });
  };

  return {
    signin,
    singup,
    signout,
  };
};

export default useAuth;
