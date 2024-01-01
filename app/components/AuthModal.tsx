'use client';

import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useContext, useEffect, useState } from 'react';
import AuthModalInputs from './AuthModalInputs';
import useAuth from '@/hooks/useAuth';
import { AuthenticationContext } from '../context/AuthContext';
import { CircularProgress } from '@mui/joy';

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderContent = (signInContent: string, loginContent: string) => {
    return isSignIn ? signInContent : loginContent;
  };

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    phone: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const { firstName, lastName, email, city, phone, password } = inputs;

    if (isSignIn) {
      if (email && password) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      if (firstName && lastName && email && city && phone && password) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [inputs]);

  const { signin, singup } = useAuth();

  const handleClick = () => {
    if (isSignIn) {
      signin({ email: inputs.email, password: inputs.password }, handleClose);
    } else {
      singup(inputs, handleClose);
    }
  };

  const { error, loading } = useContext(AuthenticationContext);

  return (
    <div className="px-2">
      <button
        className={`${
          isSignIn ? 'bg-blue-400 text-white mr-3' : 'text-black bg-gray-200 hover:bg-gray-400'
        } p-1 px-4 rounded`}
        onClick={handleOpen}
      >
        {renderContent('Sign In', 'Sign Up')}
      </button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={handleClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
          className={`h-[550px] ${isSignIn ? 'min-w-[300px] max-w-[300px]' : 'min-w-[500px]'}`}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            <div className="p-2">
              <div className="uppercase font-bold text-center pb-2 border-b">
                <p className="text-sm">{renderContent('Sign In', 'Create an Account')}</p>
              </div>
            </div>
          </Typography>
          <Typography id="modal-desc" component="form">
            {loading ? (
              <div className="flex justify-center min-h-[150px] items-center">
                <CircularProgress />
              </div>
            ) : (
              <>
                <div className="m-auto">
                  {error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-5">
                      <span className="block sm:inline">{error}</span>
                    </div>
                  ) : null}
                  <h2 className="text-2xl font-light text-center">
                    {renderContent('Log Into Your Account', 'Create Your DineSpotter Account')}
                  </h2>
                  <AuthModalInputs
                    handleChange={handleChange}
                    inputs={inputs}
                    isSignIn={isSignIn}
                  />
                </div>
                <button
                  className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                  disabled={disabled}
                  onClick={handleClick}
                  type="submit"
                >
                  {renderContent('Sign In', 'Create An Account')}
                </button>
              </>
            )}
          </Typography>
        </Sheet>
      </Modal>
    </div>
  );
}
