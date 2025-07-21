'use client'
import Button from "@/components/Button/page";
import InputField from "@/components/InputFeild/page";
import LanguageSwitcher from "@/components/LanguageSwitcher/page";
import Loader from "@/components/Loader/page";
import useTranslation from "@/hooks/useTranslation";
import { registerUser } from "@/service/register";
import { useStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import register_background from '../../../../images/register_background.svg';
export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [policy, setPolicy] = useState<boolean>(false);
  // const [isError, setIsError] = useState<boolean | string>("");
  const [policyError, setPolicyError] = useState<string>("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { t, locale } = useTranslation();
  const router = useRouter();
  const { setEmailAuthen, setPasswordAuthen, setTypeOtpAuthen } = useStore();

  const handleRegister = () => {
    setFormErrors({})
    if (!policy) setPolicyError(t("checkPolicy"));
    const checkConditionSubmit = !policy || !email || !password || !confirmPassword || Object.keys(formErrors).length > 0;
    if (checkConditionSubmit) return;
    mutate({ email, password, phoneNumber: phone });
    console.log("email authen---", email);
    setEmailAuthen(email);
    setPasswordAuthen(password);
    setTypeOtpAuthen("register");
  };

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ['register'],       // key để cache
  //   queryFn: registerUser        // hàm fetch
  // });
  // if (isLoading) return <p>Đang tải...</p>;
  // if (isError) return <p>Có lỗi xảy ra!</p>;
  // useEffect(() => {
  //   if(data.status == 200) router.push("/");
  // },[data])
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
      if (error.status === 400) {
        if (error.message.includes("Email")) {
          setFormErrors((prev) => ({ ...prev, email: error.message }));
        } else if (error.message.includes("Phone")) {
          setFormErrors((prev) => ({ ...prev, phone: error.message }));
        } else {
          setFormErrors((prev) => ({ ...prev, general: error.message }));
        }
      } else {
        console.log(error.message || "Có lỗi xảy ra");
      }
    }

  });


  useEffect(() => {
    setPolicyError("");
  }, [policy])

  const handleGetDataInput = (typeName: string, value: string) => {
    if (typeName == "email") {
      setEmail(value);
    }
    if (typeName == "phone") {
      setPhone(value);
    }
    if (typeName === "confirmPassword") {
      setConfirmPassword(value);
      if (password !== value) setFormErrors({ ...formErrors, confirmPassword: "confirm error" });
    }

    if (typeName === "password") {
      setPassword(value);
      if (confirmPassword) {
        setFormErrors({ ...formErrors, confirmPassword: "confirm error" })
      }
    }
  }

  return (
    <div className="flex w-full h-full">
      <div className="z-20 fixed top-[10px] right-[20px] flex justify-center items-center text-left rounded-[12px] w-[120px] h-[34px] p-[2px]">
        <LanguageSwitcher />
      </div>
      {isPending && (
        <Loader />
      )}
      <div className="w-1/2 flex flex-col items-center">
        <div className="text-center">
          <h2 className="font-[700] text-[34px] uppercase text-[#822FFF]">
            {t("registerTitle")}
          </h2>
          <p className="font-[400] text-[14px] text-[#636364]">{t("registerText")}</p>
        </div>
        <div className="">
          <InputField title="Email" placeholder={t("emailPlaceHolder")} type="email" name="email" onSave={(typeName, value) => handleGetDataInput(typeName, value)} getError={formErrors} />
          <InputField title={t("phone")} type="phone" name="phone" onSave={(typeName, value) => handleGetDataInput(typeName, value)} getError={formErrors} />
          <InputField title={t("password")} type="password" name="password" onSave={(typeName, value) => handleGetDataInput(typeName, value)} getError={formErrors} />
          <InputField title={t("confirmPassword")} type="password" name="confirmPassword" onSave={(typeName, value) => handleGetDataInput(typeName, value)} getError={formErrors} />
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
      <div
        className="w-1/2 h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${register_background.src})` }}
      ></div>
    </div>
  );
}
