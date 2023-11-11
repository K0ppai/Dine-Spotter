import NavBar from '@/app/components/NavBar';
import React from 'react';
import Header from './components/Header';
import RestaurantNavBar from './components/RestaurantNavBar';
import ReservationCard from './components/ReservationCard';
import Reviews from './components/Reviews';
import Images from './components/Images';
import Description from './components/Description';
import Rating from './components/Rating';
import Title from './components/Title';

const DetailPage = () => {
  return (
    <main className="bg-gray-100 min-h-screen w-full">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar />
        <Header />
        <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
          <div className="bg-white w-[70%] rounded p-3 shadow">
            <RestaurantNavBar />
            <Title />
            <Rating />
            <Description />
            <Images />
            <Reviews />
          </div>
          <div className="w-[27%] relative text-reg">
            <ReservationCard />
          </div>
        </div>
        {/* DESCRIPTION PORTION */} {/* RESERVATION CARD PORTION */}{' '}
        {/* RESERVATION
    CARD PORTION */}
      </main>
    </main>
  );
};

export default DetailPage;
