import React from 'react';
import Header from './components/Header';

const Loading = () => {
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {[...Array(12)].map((_, index) => (
          <div
            className="w-64 h-72 m-3 bg-slate-200 rounded overflow-hidden border cursor-pointer animate-pulse"
            key={index}
          />
        ))}
      </div>
    </main>
  );
};

export default Loading;
