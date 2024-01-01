"use client"

import Image from 'next/image';
import errorImage from '../../../public/icons/error.png';

const Error = ({ error }: { error: Error }) => {
  return (
    <div className="h-screen w-full bg-gray-200 flex flex-col justify-center items-center">
      <Image src={errorImage} alt="errorImage" className="w-56 mb-8" />
      <div className="bg-white px-9 py-14 shadow rounded">
        <h3 className="text-3xl font-bold">Oops! Something went wrong...</h3>
        <p className="font-bold">We couldn't found that restaurant.</p>
        <p className="mt-6 text-sm font-light">Error Code:404</p>
      </div>
    </div>
  );
};

export default Error;