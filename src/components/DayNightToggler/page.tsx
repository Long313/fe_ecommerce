'use client'
import React, { useState } from "react";
import "./dark_mode.css";
import Image from "next/image";
import sun_icon from "../../image/sun_icon.png";
import moon_icon from "../../image/moon_icon.png";
import {useStore} from "../../store/store";

const DayNightToggler: React.FC<any> = () => {
  // State để lưu trữ trạng thái bật/tắt (ngày/đêm)
  const [isNight, setIsNight] = useState(false);
  const changeNode = useStore((state) => state.setMode)


  // Hàm để xử lý khi checkbox được thay đổi
  const handleToggle = () => {
    setIsNight(!isNight);
    changeNode(!isNight);
  };

  return (
    <div className={`mx-[20px] container ${isNight ? "night" : "day"}`}>
      <div className="btn">
        <input
          type="checkbox"
          name="check"
          id="check"
          checked={isNight}
          onChange={handleToggle}
        />
        <label htmlFor="check">
          <div className="box">
            <div className={`ball ${isNight ? "night" : "day"}`}></div>
          </div>
          <div className="scenary relative flex items-center">
            {isNight ? (
              <div className="moon absolute w-[50px] h-[50px] flex justify-center items-center">
                  <Image
                    src={moon_icon}
                    alt="moon_icon"
                    className="inline-block h-[50%] w-[50%]"
                  />
              </div>
            ) : (
              <div className="sun absolute w-[50px] h-[50px] flex justify-center items-center">
                <Image
                  src={sun_icon}
                  alt="sun_icon"
                  className="inline-block h-[50%] w-[50%]"
                />
              </div>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default DayNightToggler;
