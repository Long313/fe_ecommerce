'use client'
import Image from "next/image";
import register_background from '../../../../images/register_brackground.svg';
import InputField from "@/components/InputFeild/page";
import useTranslation from "@/hooks/useTranslation";
import Button from "@/components/Button/page";
import { useEffect, useState } from "react";
export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [policy, setPolicy] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [policyError, setPolicyError] = useState<string>("");
  const { t } = useTranslation();

  const handleRegister = () => {
    console.log("email", email);
    console.log("password", password);
    console.log("phone", phone);
    console.log("register");
    if (!policy) setPolicyError("Please check policy");
    const checkConditionSubmit = !policy || !email || !password || !confirmPassword;
    if (checkConditionSubmit) return;
  };

  useEffect(() => {
    setPolicyError("");
  }, [policy])

  const handleGetDataInput = (typeName: string, value: string) => {
    console.log(typeName, value);
    if (typeName == "email") {
      setEmail(value);
    }
    if (typeName == "phone") {
      setPhone(value);
    }
    if (typeName == "password") {
      setPassword(value);
    }

    if (typeName == "confirmPassword") {
      setConfirmPassword(value);
      if (password !== value) {
        setIsError(true);
      }
    }
  }

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
          <InputField title="Email" placeholder={t("emailPlaceHolder")} type="email" name="email" onSave={(typeName, value) => handleGetDataInput(typeName, value)} />
          <InputField title={t("phone")} type="phone" name="phone" onSave={(typeName, value) => handleGetDataInput(typeName, value)} />
          <InputField title={t("password")} type="password" name="password" onSave={(typeName, value) => handleGetDataInput(typeName, value)} />
          <InputField title={t("confirmPassword")} type="password" name="confirmPassword" onSave={(typeName, value) => handleGetDataInput(typeName, value)} getError={isError} />
        </div>
        <div className="max-w-[315px] flex items-start mb-[10px]">
          <input onChange={() => setPolicy(!policy)} checked={policy}
            type="checkbox" name="policy" className="inline-block mr-[8px] mt-[2px] w-[20px]" />
          <span className="font-[500] text-[12px] inline-block">Agree to Terms and Conditions, Privacy Policy & License Agreement</span>
        </div>
        <p className="w-[315px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
          {policyError ? policyError : "\u00A0"}
        </p>
        <Button boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" title={t("signUp")} onSubmit={handleRegister} />
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
