import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import Button from "@/components/Button";
import InputField from "@/components/InputFeild";
import Loader from "@/components/Loader";
import { emailRegex } from "@/constants";
import useTranslation from "@/hooks/useTranslation";
import { forgotPassword } from "@/service/forgot-password";
import { useStore } from "@/store/store";

function ModalForgotPassWord() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const { t, locale } = useTranslation();
    const router = useRouter();
    const { setEmailAuthen, setTypeOtpAuthen } = useStore();

    const { mutate: resetPassword, isPending } = useMutation({
        mutationFn: forgotPassword,
        onSuccess: (res) => {
            if (res.status === 200) {
                router.push(`/${locale}/otp`);
            } else {
                setError("User does not exist");
            }
        },
        onError: () => setError("User does not exist"),
    });

    const handleVerifyOtp = useCallback(() => {
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email");
            return;
        }
        setEmailAuthen(email);
        setTypeOtpAuthen("reset");
        resetPassword({ email });
    }, [email, resetPassword, setEmailAuthen, setTypeOtpAuthen]);

    const handleInputChange = useCallback((_: string, value: string) => {
        setEmail(value);
        setError("");
    }, []);

    const handleBlur = useCallback((typeName: string, value: string) => {
        if (typeName === "email" && value && !emailRegex.test(value)) {
            setError("Please enter a valid email");
        }
    }, []);

    return (
        <div className="max-w-[700px]">
            {isPending && <Loader />}

            <div className="mt-[20px] text-center bg-gradient-to-r from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent text-[46px] font-[700]">
                {t("forgotPassword")}
            </div>

            <p className="mt-[10px] text-[16px] text-[#636364] text-center">{t("enterMail")}</p>

            <div className="w-[70%] mx-auto mt-[20px]">
                <InputField
                    placeholder="Enter your email"
                    star={false}
                    title="Email"
                    name="email"
                    onSave={handleInputChange}
                    onGetBlur={handleBlur}
                />
                <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-red-500 min-h-[20px]">
                    {error || "\u00A0"}
                </p>
            </div>

            <div className="flex flex-col mt-[20px] mb-[30px] mx-auto items-center justify-center">
                <Button
                    title={t("confirm")}
                    width="w-[70%]"
                    height="h-[40px]"
                    rounded="rounded-[12px]"
                    boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]"
                    onSubmit={handleVerifyOtp}
                />
            </div>
        </div>
    );
}

export default ModalForgotPassWord;
