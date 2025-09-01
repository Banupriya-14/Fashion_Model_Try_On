
import React from 'react';

const SparklesIcon: React.FC<{className: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 17l-4 4 4-4 2.293-2.293a1 1 0 011.414 0L17 14m-5-5l2 2m-2-2l-2 2" />
    </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto py-6 px-4 md:px-8 flex items-center justify-center text-center">
        <SparklesIcon className="h-10 w-10 text-indigo-500 mr-4" />
        <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
                AI Fashion Model Try-On
            </h1>
            <p className="mt-1 text-md text-gray-500">
                Visualize your designs on a virtual model instantly.
            </p>
        </div>
      </div>
    </header>
  );
};
