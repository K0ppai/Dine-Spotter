import React from 'react';
import Input from '@mui/joy/Input';

const AuthModalInputs = () => {
  return (
    <>
      <div className="my-3 flex justify-between text-sm">
        <Input disabled={false} placeholder="First Name" variant="soft" className="w-[49%]" />
        <Input disabled={false} placeholder="Last Name" variant="soft" className="w-[49%]" />
      </div>
      <div className="my-3 flex justify-between text-sm">
        <Input disabled={false} placeholder="Email" variant="soft" className="w-full" />
      </div>
      <div className="my-3 flex justify-between text-sm">
        <Input disabled={false} placeholder="City" variant="soft" className="w-[49%]" />
        <Input disabled={false} placeholder="Phone" variant="soft" className="w-[49%]" />
      </div>
      <div className="my-3 flex justify-between text-sm">
        <Input disabled={false} placeholder="Password" variant="soft" className="w-full" />
      </div>
    </>
  );
};

export default AuthModalInputs;
