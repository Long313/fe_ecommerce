'use client'
import Image from "next/image";
import register_background from '../../../../images/register_brackground.svg';
import InputField from "@/components/InputFeild/page";
import useTranslation from "@/hooks/useTranslation";
export default function Register() {
  const { t } = useTranslation()
  return (
    <div className="flex w-full h-full">
      <div className="w-1/2 flex flex-col items-center">
        <div className="text-center">
          <h2 className="font-[500] text-[34px] uppercase">
            {t("registerTitle")}
          </h2>
          <p className="font-[400] text-[14px] text-[#636364]">{t("registerText")}</p>
        </div>
        <div className="">
          <InputField title="Email" placeholder={t("emailPlaceHolder")} type="email" name="email" />
          <InputField title={t("password")} type="password" name="password"/>
          <InputField title={t("confirmPassword")} type="confirmPassword" name="confirmPassword"/>
        </div>
      </div>
      <div className="w-1/2">
        <div className="scale-105 relative w-full h-full">
          <Image src={register_background} alt="background_register"
            className="object-contain object-bottom"
            fill />
        </div>
      </div>
    </div>
  );
}
