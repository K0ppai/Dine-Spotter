'use client';

import { useReservations } from '@/hooks/useReservations';
import { CircularProgress } from '@mui/joy';
import React, { useEffect, useState } from 'react';

const Form = ({ slug, date, partySize }: { slug: string; date: string; partySize: string }) => {
  const [disabled, setDisabled] = useState(true);
  const [inputs, setInputs] = useState({
    bookerFirstName: '',
    bookerLastName: '',
    bookerPhone: '',
    bookerEmail: '',
    bookerOcassion: '',
    bookerRequest: '',
  });
  const [day, time] = date.split('T');
  const { loading, postReservations } = useReservations();
  const [bookFulfilled, setBookFulfilled] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reservation = await postReservations({
      slug,
      day,
      time,
      partySize,
      ...inputs,
      setBookFulfilled,
    });
  };

  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerPhone &&
      inputs.bookerEmail
    ) {
      return setDisabled(false);
    }
    return setDisabled(true);
  }, [inputs]);

  return (
    <form className="mt-10 flex flex-wrap justify-between w-[660px]" onSubmit={handleSubmit}>
      {bookFulfilled ? (
        <p className="text-green-500">Your reservation was booked successfully. Thank you.</p>
      ) : (
        <>
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="First name"
            name="bookerFirstName"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Last name"
            name="bookerLastName"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Phone number"
            name="bookerPhone"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Email"
            name="bookerEmail"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Occasion (optional)"
            name="bookerOcassion"
            onChange={handleChange}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
            name="bookerRequest"
            onChange={handleChange}
          />
          <button
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
            disabled={disabled || loading}
            type="submit"
          >
            {loading ? <CircularProgress color="danger" variant="soft" /> : 'Complete reservation'}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms of Use and Privacy
            Policy. Standard text message rates may apply. You may opt out of receiving text
            messages at any time.
          </p>
        </>
      )}
    </form>
  );
};

export default Form;
