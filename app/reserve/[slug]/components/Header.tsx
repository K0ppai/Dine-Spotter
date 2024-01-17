import { convertToDisplayTime } from '@/utils/convertToDisplayTime';
import { format } from 'date-fns';
import React from 'react';

const Header = ({
  name,
  image,
  partySize,
  date,
}: {
  name: string;
  image: string;
  partySize: string;
  date: string;
}) => {
  const [day, time] = date.split('T');

  return (
    <div>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img src={image} alt="" className="w-32 h-18 rounded" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{format(new Date(day), 'iii d, MMM, y')}</p>
            <p className="mr-6">{convertToDisplayTime(time)}</p>
            <p className="mr-6">{partySize === '1' ? '1 person' : `${partySize} people`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
