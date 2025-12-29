'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set launch date to 30 days from now
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date('2025-01-31') - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }

      return timeLeft;
    };

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) return;

    timerComponents.push(
      <div key={interval} className="flex flex-col items-center mx-2">
        <span className="text-4xl md:text-6xl font-bold text-white">
          {timeLeft[interval] < 10 ? `0${timeLeft[interval]}` : timeLeft[interval]}
        </span>
        <span className="text-sm md:text-lg text-gray-400 uppercase">
          {interval}
        </span>
      </div>
    );
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4"> 

      <main className="text-center max-w-4xl mx-auto mt-22">
        <h1 className="text-4xl md:text-6xl font-bold pb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
          Coming Soon
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 text-gray-300">
          We're working hard to bring you something amazing. Stay tuned!
        </p>

        <div className="flex justify-center my-12">
          {timerComponents.length ? (
            <div className="flex">
              {timerComponents}
            </div>
          ) : (
            <p className="text-xl">We're live! 🎉</p>
          )}
        </div>

        <div className="mt-8">
          <p className="text-lg mb-6 text-gray-400">Be the first to know when we launch</p>
        </div>
      </main>


    </div>
  );
}