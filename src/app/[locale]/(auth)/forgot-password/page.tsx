'use client'
import useTranslation from "@/hooks/useTranslation";
import otp_background from '../../../../images/otp_background.svg'
import ModalForgotPassWord from "@/components/Modal/ModalForgotPassWord/page";

function ForgotPassWord() {
  const { t, locale } = useTranslation();

  return (
    <div
      className="bg-center bg-cover w-full h-screen"
      style={{ backgroundImage: `url(${otp_background.src})` }}
    >
     {otp_background.src && <ModalForgotPassWord/>}
    </div >
  );
}

export default ForgotPassWord;
