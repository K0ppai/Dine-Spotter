import { Time } from '@/utils/convertToDisplayTime';
import axios from 'axios';
import { useState } from 'react';

export const useAvailabilities = () => {
  const [data, setData] = useState<{ time: Time; available: boolean }[] | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAvailabilities = async ({
    slug,
    day,
    time,
    partySize,
  }: {
    slug: string;
    day: string;
    time: Time;
    partySize: string;
  }) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://dine-spotter.vercel.app/api/restaurant/${slug}/availability`,
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
    } catch (responseError: any) {
      setError(responseError.response.data.errorMessages);
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    fetchAvailabilities,
  };
};
