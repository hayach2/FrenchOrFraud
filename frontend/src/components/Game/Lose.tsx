import React from 'react';

const Lose: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
      <div className="absolute top-2.5 left-2.5 text-blue text-2xl font-semibold">
        <a href="/">French or Fraud?</a>
      </div>
        <h1 className="text-3xl font-bold mb-4">You have lost :(</h1>
              <a href="/play" className="mt-4 inline-block mr-4">
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Play Again
        </button>
      </a>
      <a href="/" className="mt-4 inline-block">
        <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
          Go Home
        </button>
  </a>
      </div>
    </div>

  );
}

export default Lose;
