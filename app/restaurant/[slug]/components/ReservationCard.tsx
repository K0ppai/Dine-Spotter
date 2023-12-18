'use client';
import { partySize as partySizes } from '@/data/partySize';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { times } from '@/data';
import { useAvailabilities } from '@/hooks/useAvailabilities';
import { CircularProgress } from '@mui/joy';
import Link from 'next/link';

const ReservationCard = ({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [partySize, setPartySize] = useState<string>('2');
  const [time, setTime] = useState<string>(openTime);
  const [day, setDay] = useState<string>(new Date().toISOString().split('T')[0]);
  const { data, loading, fetchAvailabilities } = useAvailabilities();

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split('T')[0]);
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  const handleClick = () => {
    fetchAvailabilities({ slug, day, time, partySize });
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
        <select
          name=""
          className="py-3 border-b font-light"
          id=""
          onChange={(e) => {
            setPartySize(e.target.value);
          }}
        >
          {partySizes.map((size, index) => (
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
          <select
            name=""
            id=""
            className="py-3 border-b font-light"
            onChange={(e) => {
              setTime(e.target.value);
            }}
          >
            {filterTimeByRestaurantOpenWindow().map((time, index) => (
              <option key={index} value={time.time}>
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
          onClick={handleClick}
        >
          {loading ? <CircularProgress color='neutral' /> : 'Find a Table'}
        </button>
      </div>
      {data && data.length ? (
        <div className="mt-4">
          <p className="text-red">Select a time</p>
          <div className="flex flex-wrap mt-2">
            {data.map((time, index) => {
              return time.available ? (
                <Link
                  href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                  className="bg-red-600 text-white p-2 w-24 text-center mb-3 rounded mr-3 font-bold text-sm"
                  key={index}
                >
                  {time.time}
                </Link>
              ) : (
                <p className="bg-gray-400 p-2 w-24 h-2 rounded mr-3" key={index}></p>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReservationCard;
