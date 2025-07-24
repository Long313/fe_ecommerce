'use client'
import Button from "@/components/Button/page";
import InputField from "@/components/InputFeild/page";
import Loader from "@/components/Loader/page";
import useTranslation from "@/hooks/useTranslation";
import { login } from "@/service/login";
import { useStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import google_logo from '../../../../images/icon_google.png';
import login_background from '../../../../images/login_background.svg';

export default function Login() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  // const [isError, setIsError] = useState<boolean>(false);
  const { setUserInfor } = useStore();

  const { t, locale } = useTranslation();
  const { data: session } = useSession();
  const emailAuthen = useStore((state) => state.emailAuthen);
  const passwordAuthen = useStore((state) => state.passwordAuthen);
  const router = useRouter();
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberEmail');
    const savedPassword = localStorage.getItem('rememberPassword');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRemember(true);
    }
  }, []);

  useEffect(() => {
    if (session) {
      setUserInfor({
        email: session?.user?.email || "",
        fullname: session?.user?.name || "",
      });
    }
  }, [])
  const handleLogin = () => {

    const checkConditionSubmit = !email || !password;
    if (checkConditionSubmit) return;
    mutate({ email, password });
  };

  const { setAccessToken } = useStore();
  const {
    mutate,
    isPending
    // isError: mutationError,
    // isSuccess,
    // error,
  } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      if (res.status === 200) {
        setUserInfor(res.data);
        const getCookie = (name: string): string | null => {
          if (typeof document === 'undefined') return null;
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) {
            const tokenPart = parts.pop();
            if (tokenPart) {
              return tokenPart.split(';').shift() ?? null;
            }
          }
          return null;
        };

        const accessToken = getCookie('access_token');
        if (accessToken) {
          console.log('AccessToken', accessToken);
          setAccessToken(accessToken);
        }
        router.push(`/${locale}/`);
        if (remember) {
          localStorage.setItem('rememberEmail', email);
          localStorage.setItem('rememberPassword', password);
        } else {
          localStorage.removeItem('rememberEmail');
        }
      }
    },
    onError: (error: { status: number, message: string }) => {
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
      {isPending && (
        <Loader />
      )}
      <div className="w-1/2 flex flex-col items-center justify-center">
        <div className="text-center mb-[20px]">
          <h2 className="font-[700] text-[34px] uppercase text-[#822FFF]">
            {t("loginTitle")}
          </h2>
          <p className="font-[400] text-[14px] text-[#636364]">{t("loginText")}</p>
        </div>
        <div className="">
          <InputField valueDefault={email ? email : emailAuthen} title="Email" placeholder={t("emailPlaceHolder")} type="email" name="email" onSave={(typeName, value) => handleGetDataInput(typeName, value)} />
          <InputField valueDefault={password ? password : passwordAuthen} title={t("password")} type="password" name="password" onSave={(typeName, value) => handleGetDataInput(typeName, value)} />
        </div>
        <div className="w-full max-w-[315px] flex justify-between items-center mb-[10px]">
          <div className="flex items-center">
            <input onChange={() => setRemember(!remember)} checked={remember}
              type="checkbox" name="remember" className="inline-block w-[20px] mr-[4px]" />
            <span className="font-[500] text-[12px] inline-block">{t("Remember me")}</span>
          </div>
          <p onClick={() => router.push(`/${locale}/forgot-password`)} className="font-[500] text-[12px] inline-block text-[#822FFF] cursor-pointer">{t("forgotPasswordTitle")}</p>
        </div>
        <Button title={t("signIn")} onSubmit={handleLogin} boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" />
        <Button margin="mt-[10px]" widthLogo={16} heightLogo={16} image={google_logo} color="text-black" border="border-[1.78px] border-[rgba(0,0,0,0.25)]" boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" backgroundColor="bg-white" title={t("signInWithGoogle")} onSubmit={() => signIn("google", { callbackUrl: `/${locale}` })} />
        <div className="font-[500] text-[12px] mt-[8px]">
          {t("dontHaveAccountTitle")}
          <Link href={`/${locale}/register`} className="text-[#822FFF] ml-1">{t("signUpFreeTitle")}</Link>
        </div>
      </div>
      <div
        className="w-1/2 h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${login_background.src})` }}
      ></div>
    </div>
  );
}
