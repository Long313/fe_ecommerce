'use client'
import Button from "@/components/Button/page";
import InputField from "@/components/InputFeild/page";
import useTranslation from "@/hooks/useTranslation";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import google_logo from '../../../../images/icon_google.png';
import login_background from '../../../../images/login_background.svg';
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/service/login";

export default function Login() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  // const [isError, setIsError] = useState<boolean>(false);
  const { t, locale } = useTranslation();
  const { data: session } = useSession();
  const emailAuthen = useStore((state) => state.emailAuthen);
  const passwordAuthen = useStore((state) => state.passwordAuthen);
  const router = useRouter();
  if (session) {
    console.log("session", session);
  }
  const handleLogin = () => {
    console.log("email", email);
    console.log("password", password);
    console.log("login");
    const checkConditionSubmit = !email || !password;
    if (checkConditionSubmit) return;
    mutate({email,password});
  };

  const {
    mutate,
    isPending, // làm loading
    isError: mutationError, 
    isSuccess,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      if (res.status === 200) {
        router.push(`/${locale}/`);
      }
    },
    onError: (error: any) => {
      if (error.status === 400) {
        
      } else {
        console.log(error.message || "Có lỗi xảy ra");
      }
    }

  });

  const handleGetDataInput = (typeName: string, value: string) => {
    console.log(typeName, value);
    if (typeName == "email") {
      setEmail(value);
    }
    if (typeName == "password") {
      setPassword(value);
    }

  }

  return (
    <div className="flex w-full h-full">
      <div className="w-1/2 flex flex-col items-center">
        <div className="text-center mb-[20px]">
          <h2 className="font-[700] text-[34px] uppercase text-[#822FFF]">
            {t("loginTitle")}
          </h2>
          <p className="font-[400] text-[14px] text-[#636364]">{t("loginText")}</p>
        </div>
        <div className="">
          <InputField valueDefault={emailAuthen} title="Email" placeholder={t("emailPlaceHolder")} type="email" name="email" onSave={(typeName, value) => handleGetDataInput(typeName, value)} />
          <InputField valueDefault={passwordAuthen} title={t("password")} type="password" name="password" onSave={(typeName, value) => handleGetDataInput(typeName, value)} />
        </div>
        <div className="w-full max-w-[315px] flex justify-between items-center mb-[10px]">
          <div className="flex items-center">
            <input onChange={() => setRemember(!remember)} checked={remember}
              type="checkbox" name="remember" className="inline-block w-[20px] mr-[4px]" />
            <span className="font-[500] text-[12px] inline-block">{t("Remember me")}</span>
          </div>
          <p className="font-[500] text-[12px] inline-block text-[#822FFF] cursor-pointer">{t("forgotPasswordTitle")}</p>
        </div>
        <Button title={t("signIn")} onSubmit={handleLogin} boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" />
        <Button margin="mt-[10px]" widthLogo={16} heightLogo={16} image={google_logo} color="text-black" border="border-[1.78px] border-[rgba(0,0,0,0.25)]" boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" backgroundColor="bg-white" title={t("signInWithGoogle")} onSubmit={() => signIn("google", { callbackUrl: `/${locale}` })} />
        <div className="font-[500] text-[12px] mt-[8px]">
          {t("dontHaveAccountTitle")}
          <Link href={`/${locale}/register`} className="text-[#822FFF] ml-1">{t("signUpFreeTitle")}</Link>
        </div>
      </div>
      <div className="w-1/2">
        <div className="scale-105 relative w-full h-full">
          <Image src={login_background} alt="background_register"
            className="object-contain object-bottom"
            fill />
        </div>
      </div>
    </div>
  );
}
