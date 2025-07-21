'use client';
import LanguageSwitcher from '@/components/LanguageSwitcher/page';
import ModalResetPassword from '@/components/Modal/ModalResetPassword/page';
import register_background from '../../../../images/register_background.svg';

export default function ResetPassWord() {

  return (
    <div className="flex">
      <div className="bg-[#fff] z-20 fixed top-[10px] right-[20px] flex justify-center items-center text-left rounded-[12px] w-[120px] h-[34px] p-[2px]">
        <LanguageSwitcher />
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <ModalResetPassword />
      </div>
      <div
        className="w-1/2 h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${register_background.src})` }}
      ></div>
    </div >
  );
}
