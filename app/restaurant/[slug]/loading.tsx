import React from 'react';

const Loading = () => {
  return (
    <main className="bg-gray-100 min-h-screen w-full">
      <div className="max-w-screen-2xl m-auto bg-white">
        <div className="bg-white w-[70%] rounded p-3 shadow">
          <nav className="flex text-reg border-b pb-2">
            <a href="#" className="mr-7">
              Overview
            </a>
            <a href="#" className="mr-7">
              Menu
            </a>
          </nav>

          <div className="mt-4 border-b pb-6 animate-pulse bg-slate-200 w-[400px] h-16 rounded"></div>

          <div className="flex items-end animate-pulse">
            <div className="ratings mt-2 flex items-center">
              <div className="flex items-center bg-slate-200 w-56"></div>
              <p className="text-reg ml-3"></p>
            </div>
            <div>
              <p className="text-reg ml-4"> </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Loading;
