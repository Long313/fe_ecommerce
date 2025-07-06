'use client'
import useTranslation from "@/hooks/useTranslation";
import otp_background from '../../../../images/otp_background.svg'
import Modal from "@/components/Modal/page";

function SendOtp() {
  const { t, locale } = useTranslation();

  return (
    <div
      className="bg-center bg-cover w-full h-screen"
      style={{ backgroundImage: `url(${otp_background.src})` }}
    >
      <Modal/>
    </div >
  );
}

export default SendOtp;
