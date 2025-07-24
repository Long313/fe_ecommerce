'use client'

import { useEffect, useState } from "react";

const COUNTDOWN_DURATION = 300; // 5 phút
const STORAGE_KEY = "otp_expiry_time";

function CountdownTimer({ callBack }: { callBack: boolean }) {
  const [secondsLeft, setSecondsLeft] = useState<number>(COUNTDOWN_DURATION);

  // Đọc từ localStorage khi component mount
  useEffect(() => {
    const expiryString = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    if (expiryString) {
      const expiryTime = parseInt(expiryString, 10);
      const remaining = Math.floor((expiryTime - now) / 1000);
      if (remaining > 0) {
        setSecondsLeft(remaining);
        return;
      }
    }

    // Nếu không có hoặc đã hết hạn
    const newExpiry = now + COUNTDOWN_DURATION * 1000;
    localStorage.setItem(STORAGE_KEY, newExpiry.toString());
    setSecondsLeft(COUNTDOWN_DURATION);
  }, []);

  // Reset thời gian khi callBack thay đổi (ví dụ khi bấm "Resend OTP")
  useEffect(() => {
    if (callBack) {
      const newExpiry = Date.now() + COUNTDOWN_DURATION * 1000;
      localStorage.setItem(STORAGE_KEY, newExpiry.toString());
      setSecondsLeft(COUNTDOWN_DURATION);
    }
  }, [callBack]);

  // Đếm lùi
  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="text-center text-[20px] text-[#FF35C4] font-[600]">
      {formatTime(secondsLeft)}
    </div>
  );
}

export default CountdownTimer;
