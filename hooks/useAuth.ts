import { AuthenticationContext } from '@/app/context/AuthContext';
import axios from 'axios';
import { useContext } from 'react';

const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(AuthenticationContext);

  const signin = async ({ email, password }: { email: string; password: string }) => {
    setAuthState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await axios.post('http://localhost:3000/api/auth/signin', {
        email,
        password,
      });

      setAuthState({ data: response.data, loading: false, error: null });
    } catch (error: any) {
      setAuthState((prev) => ({
        ...prev,
        error: error.response.data.errorMessage,
        loading: false,
      }));
      console.log(error);
    }
  };
  const signout = () => {
    console.log('signout');
  };

  return {
    signin,
    signout,
  };
};

export default useAuth;
