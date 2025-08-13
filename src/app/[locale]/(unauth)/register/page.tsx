'use client'
import Button from "@/components/Button";
import InputField from "@/components/InputFeild";
import Loader from "@/components/Loader";
import useTranslation from "@/hooks/useTranslation";
import { registerUser } from "@/service/register";
import { useStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { toast, Toaster } from 'react-hot-toast';

import { emailRegex, passwordRegex, phoneRegex } from "@/constants";
import register_background from '../../../../images/register_background.svg';
const PhoneInput = dynamic(() => import('@/components/PhoneWrapper'), {
  ssr: false,
});
export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [policy, setPolicy] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    policy: "",
  });
  const { t, locale } = useTranslation();
  const router = useRouter();
  const { setEmailAuthen, setPasswordAuthen, setTypeOtpAuthen } = useStore();
  useEffect(() => {
    setFormErrors(prev => ({ ...prev, policy: "" }));
  }, [policy])
  const handleRegister = () => {
    if (!policy) {
      setFormErrors(prev => ({ ...prev, policy: "Please agree to the Terms and Conditions, Privacy Policy & License Agreement" }));
      return;
    }
    const checkConditionSubmit = !phone || !email || !password || !confirmPassword;
    if (checkConditionSubmit) {
      toast.error('Nhập đầy đủ các trường trước khi đăng ký !');
      return;
    }
    mutate({ email, password, phoneNumber: phone });
    setEmailAuthen(email);
    setPasswordAuthen(password);
    setTypeOtpAuthen("register");
  };

  const {
    mutate,
    isPending
    // isError: mutationError,
    // isSuccess,
    // error,
  } = useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      if (res.status === 200) {
        router.push(`/${locale}/otp`);
      }
    },
    onError: (error: { status: number, message: string }) => {
      console.log("error", error)
      if (Number(error.status) === 400) {
        toast.error(error.message);
      } else {
        toast.error("Register failed!");
      }
    }
  });

  const handleChange = (typeName: string, value: string) => {
    setFormErrors(prev => ({ ...prev, [typeName]: "" }));

    if (typeName === "email") setEmail(value);
    if (typeName === "phone") setPhone(value);
    if (typeName === "password") setPassword(value);
    if (typeName === "confirmPassword") setConfirmPassword(value);
  };

  const handleBlur = (typeName: string, value: string) => {
    if (!value.trim()) return;

    if (typeName === "email" && !emailRegex.test(value)) {
      setFormErrors(prev => ({ ...prev, email: "Please enter a valid email" }));
    }
    if (typeName === "phone" && !phoneRegex.test(value.replace(/\s+/g, ""))) {
      setFormErrors(prev => ({ ...prev, phone: "Please enter a valid phone number" }));
    }
    if (typeName === "password" && !passwordRegex.test(value)) {
      setFormErrors(prev => ({ ...prev, password: "Please enter a valid password" }));
    }
    if (typeName === "confirmPassword" && password && value !== password) {
      setFormErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
    }
    if (typeName === "password" && confirmPassword && value !== confirmPassword) {
      setFormErrors(prev => ({ ...prev, password: "Passwords do not match" }));
    }
  };


  return (
    <div className="flex w-full min-h-screen overflow-y-scroll custom-scroll custom-color">
      {isPending && (
        <Loader />
      )}
      <div className="w-1/2 flex flex-col items-center">
        <div className="text-center">
          <h2 className="font-[700] text-[34px] uppercase bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
            {t("registerTitle")}
          </h2>
          <p className="font-[400] text-[14px] text-[#636364]">{t("registerText")}</p>
        </div>
        <div className="">
          <div>
            <InputField onGetBlur={(typeName, value) => handleBlur(typeName, value)} title="Email" placeholder={t("emailPlaceHolder")} type="email" name="email" onSave={(typeName, value) => handleChange(typeName, value)} />
            <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
              {formErrors.email || "\u00A0"}
            </p>
          </div>
          <div>
            <PhoneInput onGetBlur={(typeName, value) => handleBlur(typeName, value)} onSave={(typeName, value) => handleChange(typeName, value)} />
            <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
              {formErrors.phone || "\u00A0"}
            </p>
          </div>
          <div>
            <InputField onGetBlur={(typeName, value) => handleBlur(typeName, value)} title={t("password")} placeholder={t("passwordPlaceHolder")} type="password" name="password" onSave={(typeName, value) => handleChange(typeName, value)} />
            <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
              {formErrors.password || "\u00A0"}
            </p>
          </div>
          <div>
            <InputField onGetBlur={(typeName, value) => handleBlur(typeName, value)} title={t("confirmPassword")} type="password" name="confirmPassword" onSave={(typeName, value) => handleChange(typeName, value)} compareWith={password} />
            <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
              {formErrors.confirmPassword || "\u00A0"}
            </p>
          </div>
        </div>
        <div className="max-w-[315px] flex flex-col mb-[10px]">
          <div className="flex items-start">
            <input onChange={() => setPolicy(!policy)} checked={policy}
              type="checkbox" name="policy" className="inline-block mr-[8px] mt-[2px] w-[20px]" />
            <span className="font-[500] text-[12px] inline-block">{t("checkPolicy")}</span>
          </div>
          <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
            {formErrors.policy || "\u00A0"}
          </p>
        </div>
        <Button boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" title={t("signUp")} height="h-[36px]" onSubmit={handleRegister} />
        <div className="font-[500] text-[12px] mt-[8px] hover:opacity-80">
          {t("doHaveAccountTitle")}
          <Link href={`/${locale}/login`} className="text-[#822FFF] ml-1">{t("signInNowTitle")}</Link>
        </div>
      </div>
      <div
        className="w-1/2 bg-cover bg-center sticky top-0 right-0 bottom-0"
        style={{ backgroundImage: `url(${register_background.src})` }}
      ></div>
      <Toaster position="bottom-right" />
    </div>
  );
}
