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
    <>
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
    </>
  );
};

export default DetailPage;
