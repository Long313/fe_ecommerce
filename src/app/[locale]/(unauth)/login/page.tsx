'use client'
import FormField from "@/components/FormField";
import InputField from "@/components/InputFeild";
import Loader from "@/components/Loader";
import { emailRegex, passwordRegex } from "@/constants";
import useTranslation from "@/hooks/useTranslation";
import { login } from "@/service/login";
import { useAccessToken, useStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { signIn, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast, Toaster } from 'react-hot-toast';
import google_logo from '../../../../images/icon_google.png';
const Button = dynamic(() => import('@/components/Button'), {
  ssr: false,
});
export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const { setUserInfor } = useStore();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({
    email: "",
    password: "",
  });
  const { t, locale } = useTranslation();
  const { data: session } = useSession();

  const router = useRouter();
  const { setAccessToken } = useAccessToken();

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
        email: session.user?.email || "",
        fullname: session.user?.name || "",
      });
      const token = session.accessToken;
      if (token) {
        setAccessToken(token);
      }
    }
  }, [session, setUserInfor, setAccessToken]);

  const handleLogin = useCallback(() => {
    const checkConditionSubmit = !email || !password;
    if (checkConditionSubmit) {
      toast.error('Nhập đầy đủ các trường trước khi đăng nhập !');
      return
    } else if (password && !passwordRegex.test(password)) {
      setFormErrors(prev => ({ ...prev, password: "Please enter a valid password" }));
      return
    } else if (email && !emailRegex.test(email)) {
      setFormErrors(prev => ({ ...prev, email: "Please enter a valid email" }));
      return
    }
    mutate({ email, password });
  }, [email, password]);

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
        setUserInfor({ ...res.data, avatar: res.data.avatar_url });
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
      if (Number(error.status) === 400) {
        if (error.message === "Wrong credentials") {
          toast.error("Wrong password!");
        } else {
          toast.error("Login failed!");
        }
      } else {
        toast.error(error.message || "Login failed");
      }
    }
  });

  const handleChange = (typeName: string, value: string) => {
    setFormErrors(prev => ({ ...prev, [typeName]: "" }));
    if (typeName === "email") setEmail(value);
    if (typeName === "password") setPassword(value);
  };

  const handleBlur = (typeName: string, value: string) => {
    if (!value.trim()) return;

    if (typeName === "email" && !emailRegex.test(value)) {
      setFormErrors(prev => ({ ...prev, email: "Please enter a valid email" }));
    }

    if (typeName === "password" && !passwordRegex.test(value)) {
      setFormErrors(prev => ({ ...prev, password: "Please enter a valid password" }));
    }
  };

  return (
    <div className="flex w-full h-full">
      {isPending && (
        <Loader />
      )}
      <div className="w-1/2 flex flex-col items-center justify-center">
        <div className="text-center mb-[20px]">
          <h2 className="font-[700] text-[34px] uppercase bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
            {t("loginTitle")}
          </h2>
          <p className="font-[400] text-[14px] text-[#636364]">{t("loginText")}</p>
        </div>
        <div className="">
          <div>
            <FormField error={formErrors.email}>
              <InputField onGetBlur={(typeName, value) => handleBlur(typeName, value)} title="Email" placeholder={t("emailPlaceHolder")} type="email" name="email" onSave={(typeName, value) => handleChange(typeName, value)} />
              {/* <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
                {formErrors.email || "\u00A0"}
              </p> */}
            </FormField>
          </div>
          <div>
            <FormField error={formErrors.email}>
              <InputField onGetBlur={(typeName, value) => handleBlur(typeName, value)} title={t("password")} type="password" name="password" placeholder={t("passwordPlaceHolder")} onSave={(typeName, value) => handleChange(typeName, value)} />
              {/* <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
                {formErrors.password || "\u00A0"}
              </p> */}
            </FormField>
          </div>
        </div>
        <div className="w-full max-w-[315px] flex justify-between items-center mb-[20px]">
          <div className="flex items-center">
            <input onChange={() => setRemember(!remember)} checked={remember}
              type="checkbox" name="remember" className="inline-block w-[20px] mr-[4px]" />
            <span className="font-[500] text-[12px] inline-block">{t("Remember me")}</span>
          </div>
          <p onClick={() => router.push(`/${locale}/forgot-password`)} className="font-[500] text-[12px] inline-block text-[#822FFF] cursor-pointer hover:opacity-80">{t("forgotPasswordTitle")}</p>
        </div>
        <Button title={t("signIn")} onSubmit={handleLogin} boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" />
        <Button margin="mt-[10px]" widthLogo={16} heightLogo={16} image={google_logo} color="text-black" border="border-[1.78px] border-[rgba(0,0,0,0.25)]" boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" backgroundColor="bg-white" title={t("signInWithGoogle")} onSubmit={() => signIn("google", { callbackUrl: `/${locale}` })} />
        <div className="font-[500] text-[12px] mt-[16px]">
          {t("dontHaveAccountTitle")}
          <Link href={`/${locale}/register`} className="text-[#822FFF] ml-1 hover:opacity-80">{t("signUpFreeTitle")}</Link>
        </div>
      </div>
      <div className="w-1/2 h-screen bg-cover bg-center bg-[url('/images/login_background.svg')]"></div>
      <Toaster position="bottom-right" />
    </div>
  );
}
