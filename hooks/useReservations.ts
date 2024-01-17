import { Time } from '@/utils/convertToDisplayTime';
import axios from 'axios';
import { useState } from 'react';

export const useReservations = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postReservations = async ({
    slug,
    day,
    time,
    partySize,
    bookerFirstName,
    bookerLastName,
    bookerPhone,
    bookerEmail,
    bookerOcassion,
    bookerRequest,
    setBookFulfilled,
  }: {
    slug: string;
    day: string;
    time: Time;
    partySize: string;
    bookerFirstName: string;
    bookerLastName: string;
    bookerPhone: string;
    bookerEmail: string;
    bookerOcassion: string;
    bookerRequest: string;
    setBookFulfilled: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/restaurant/${slug}/reserve`,
        {
          bookerFirstName,
          bookerLastName,
          bookerPhone,
          bookerEmail,
          bookerOcassion,
          bookerRequest,
        },
        {
          params: {
            day,
            time,
            partySize,
          },
        },
      );
      setData(response.data);
      setLoading(false);
      setBookFulfilled(true);
    } catch (responseError: any) {
      setError(responseError.response.data.errorMessages);
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    postReservations,
  };
};
