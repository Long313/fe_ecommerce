'use client'
import { useEffect, useState } from "react";

function CountdownTimer() {
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 phút

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="text-center text-[24px] text-[#000000]">
      {formatTime(secondsLeft)}
    </div>
  );
}

export default CountdownTimer;
