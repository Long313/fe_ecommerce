'use client'
import LanguageSwitcher from "@/components/LanguageSwitcher";
import dynamic from "next/dynamic";

const ModalForgotPassWord = dynamic(
  () => import("@/components/Modal/ModalForgotPassWord"),
  { ssr: false }
);

function ForgotPassWord() {

  return (
    <div className="flex">
      <div className="z-20 fixed top-[10px] right-[20px] flex justify-center items-center text-left rounded-[12px] w-[120px] h-[34px] p-[2px]">
        <LanguageSwitcher />
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <ModalForgotPassWord />
      </div>
      <div
        className="w-1/2 h-screen bg-cover bg-center bg-[url('/images/register_background.svg')]"
      ></div>
    </div >
  );
}

export default ForgotPassWord;
