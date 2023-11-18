import React from 'react';
import Input from '@mui/joy/Input';

interface PropsType {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    phone: string;
    password: string;
  };
  isSignIn: boolean;
}

const AuthModalInputs = ({ handleChange, inputs, isSignIn }: PropsType) => {
  return (
    <>
      {isSignIn ? null : (
        <div className="my-3 flex justify-between text-sm">
          <Input
            disabled={false}
            placeholder="First Name"
            variant="soft"
            className="w-[49%]"
            onChange={handleChange}
            value={inputs.firstName}
            name="firstName"
          />
          <Input
            disabled={false}
            placeholder="Last Name"
            variant="soft"
            className="w-[49%]"
            onChange={handleChange}
            value={inputs.lastName}
            name="lastName"
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <Input
          disabled={false}
          placeholder="Email"
          variant="soft"
          className="w-full"
          onChange={handleChange}
          value={inputs.email}
          name="email"
        />
      </div>
      {isSignIn ? null : (
        <div className="my-3 flex justify-between text-sm">
          <Input
            disabled={false}
            placeholder="City"
            variant="soft"
            className="w-[49%]"
            onChange={handleChange}
            value={inputs.city}
            name="city"
          />
          <Input
            disabled={false}
            placeholder="Phone"
            variant="soft"
            className="w-[49%]"
            onChange={handleChange}
            value={inputs.phone}
            name="phone"
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <Input
          disabled={false}
          placeholder="Password"
          variant="soft"
          className="w-full"
          onChange={handleChange}
          value={inputs.password}
          name="password"
        />
      </div>
    </>
  );
};

export default AuthModalInputs;
