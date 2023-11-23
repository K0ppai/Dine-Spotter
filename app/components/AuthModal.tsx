'use client';

import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useEffect, useState } from 'react';
import AuthModalInputs from './AuthModalInputs';

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const [open, setOpen] = useState(false);

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
  }
  , [inputs]);

  return (
    <>
      <Button
        className={`${renderContent(
          'bg-blue-400 text-white mr-3',
          'text-black bg-gray-200 hover:bg-gray-400',
        )} p-1 px-4 rounded`}
        onClick={() => setOpen(true)}
      >
        {renderContent('Sign In', 'Sign Up')}
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
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
          className="h-[550px]"
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
          <Typography id="modal-desc" textColor="text.tertiary">
            <div className="m-auto">
              <h2 className="text-2xl font-light text-center">
                {renderContent('Log Into Your Account', 'Create Your DineSpotter Account')}
              </h2>
              <AuthModalInputs handleChange={handleChange} inputs={inputs} isSignIn={isSignIn} />
            </div>
            <button className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400" disabled={disabled}>
              {renderContent('Sign In', 'Create An Account')}
            </button>
          </Typography>
        </Sheet>
      </Modal>
    </>
  );
}
