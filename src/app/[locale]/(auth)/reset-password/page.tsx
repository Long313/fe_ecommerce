'use client'
import useTranslation from "@/hooks/useTranslation";
import otp_background from '../../../../images/otp_background.svg'
import ModalForgotPassWord from "@/components/Modal/ModalForgotPassWord/page";
import ModalResetPassword from "@/components/Modal/ModalResetPassword/page";

function ResetPassWord() {
  const { t, locale } = useTranslation();

  return (
    <div
      className="bg-center bg-cover w-full h-screen"
      style={{ backgroundImage: `url(${otp_background.src})` }}
    >
     {otp_background.src && <ModalResetPassword/>}
    </div >
  );
}

export default ResetPassWord;
