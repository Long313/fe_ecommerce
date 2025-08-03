'use client';

import React, { useEffect, useState } from 'react';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const difference = +targetDate - +now;

    if (isNaN(difference) || difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000); 

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeBlock = (value: number, label: string) => (
    <div className="bg-white rounded-md shadow-md p-4 w-20 text-center">
      <div className="text-2xl font-[600]">{String(value).padStart(2, '0')}</div>
      <div className="text-sm text-gray-600 font-[600]">{label}</div>
    </div>
  );

  return (
    <div className="flex gap-4 items-center justify-start">
      {timeBlock(timeLeft.days, 'Days')}
      {timeBlock(timeLeft.hours, 'Hours')}
      {timeBlock(timeLeft.minutes, 'Minutes')}
      {timeBlock(timeLeft.seconds, 'Seconds')}
    </div>
  );
};

export default CountdownTimer;
