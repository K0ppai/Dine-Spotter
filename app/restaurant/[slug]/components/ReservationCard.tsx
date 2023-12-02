'use client';
import partySize from '@/data/partySize';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { times } from '@/data';

const ReservationCard = ({ openTime, closeTime }: { openTime: string; closeTime: string }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  const filterTimeByRestaurantOpenWindow = () => {
    const openTimes: typeof times = [];

    let isOpen = false;

    times.forEach((time) => {
      if (time.time === openTime) {
        isOpen = true;
      }
      if (isOpen) {
        openTimes.push(time);
      }
      if (time.time === closeTime) {
        isOpen = false;
      }
    });

    return openTimes;
  };

  return (
    <div className="absolute bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select name="" className="py-3 border-b font-light" id="">
          {partySize.map((size, index) => (
            <option key={index} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className="py-3 border-b w-24 text-sm"
            dateFormat={'MMMM d'}
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select name="" id="" className="py-3 border-b font-light">
            {filterTimeByRestaurantOpenWindow().map((time, index) => (
              <option key={index} value={time.time}>
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
          Find a Time
        </button>
      </div>
    </div>
  );
};

export default ReservationCard;
