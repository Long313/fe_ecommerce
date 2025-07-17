'use client'

import useTranslation from "@/hooks/useTranslation";
import { verifyOtpRegister } from "@/service/register";
import { useStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from 'react';
import { useRouter } from "next/navigation";
import CountdownTimer from "@/components/CountDown/page";
import Button from "@/components/Button/page";
import InputField from "@/components/InputFeild/page";
import { resendOtp } from "@/service/otp";
import { forgotPassword, resetPassword } from "@/service/forgot-password";

function ModalResetPassword() {

    const otpLength = 4;
    // const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(""));
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [resetTime, setResetTime] = useState<boolean>(false)
    const { t, locale } = useTranslation();
    const router = useRouter();
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const emailAuthen = useStore((state) => state.emailAuthen);
    const { setEmailAuthen, setPasswordAuthen, setTypeOtpAuthen } = useStore();
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    // const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value;

    //     if (!/^[0-9]?$/.test(value)) return;

    //     const newOtp = [...otp];
    //     newOtp[index] = value;
    //     setOtp(newOtp);

    //     if (value && index < otpLength - 1) {
    //         inputRefs.current[index + 1]?.focus();
    //     }
    // };

    // const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === "Backspace" && otp[index] === "" && index > 0) {
    //         inputRefs.current[index - 1]?.focus();
    //     }
    // };

    // const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    //     e.preventDefault();
    //     const pasteData = e.clipboardData.getData("text").trim();
    //     if (!/^\d+$/.test(pasteData)) return;

    //     const pasteArray = pasteData.slice(0, otpLength).split("");
    //     const newOtp = [...otp];
    //     pasteArray.forEach((digit, idx) => {
    //         newOtp[idx] = digit;
    //         if (inputRefs.current[idx]) {
    //             inputRefs.current[idx]!.value = digit;
    //         }
    //     });
    //     setOtp(newOtp);

    //     const nextIndex = pasteArray.length < otpLength ? pasteArray.length : otpLength - 1;
    //     inputRefs.current[nextIndex]?.focus();
    // };


    const handleCloseModal = () => {
    }

    // const handleVerifyOtp = () => {
    //     // const codeOtp = otp.join("");
    //     // console.log("codeOpt", codeOtp);
    //     // console.log("emailAuthen", emailAuthen);
    //     mutateResetPassword({ email});
    //     setEmailAuthen(email);
    //     setTypeOtpAuthen("reset")
    // }



    const handleGetDataInput = (typeName: string, value: string) => {
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

    const {
        mutate: mutateResetPassword,
        isPending: isPendingResetPassword, // làm loading
        isError: mutationErrorResetPassword,
        isSuccess: isSuccessResetPassword,
        error: errorResetPassword,
    } = useMutation({
        mutationFn: resetPassword,
        onSuccess: (res) => {
            if (res.status === 200) {
                router.push(`/${locale}/login`);
            }
        },
        onError: (error: any) => {
            console.log(error.message || "Có lỗi xảy ra");
        }

    });

    const handleUpdatePassword = () => {
        mutateResetPassword({ email: emailAuthen, newPassword: password })
    }

    return (<div className="p-[8px] rounded-[16px] fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30%] max-w-[896px] max-h-[606px] bg-white">
        {/* <div className="flex justify-between"><p className="text-[#751872]">{t("registerTitle")}</p><X color="#9135FA" className="cursor-pointer" onClick={handleCloseModal} /></div> */}
        <div className="mt-[20px] text-center text-[#030303] text-[20px] font-[500]">{t("setNewPassword")}</div>
        {/* <div className="flex flex-col items-center mt-[10px]">
            <p className="text-[16px] text-[#636364] text-center">{t("enterMail")}</p>
        </div> */}
        <div className="w-[80%] mx-auto mt-[20px]">
            <InputField placeholder="Enter your new password" type="password" title="Password" name="password" onSave={(typeName, value) => handleGetDataInput(typeName, value)} getError={formErrors} />
            <InputField placeholder="Re-enter password" type="password" title="Confirm password" name="confirmPassword" onSave={(typeName, value) => handleGetDataInput(typeName, value)} getError={formErrors} />
        </div>

        <div className="flex-col mb-[30px] mx-auto flex justify-center items-center">
            <Button title={t("updatePassword")} width="w-[80%]" height="h-[34px]" rounded="rounded-[12px]" onSubmit={handleUpdatePassword} boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" />
            {/* <p className="text-[14px] mt-[10px] text-[#B9B9B9]">Didn’t you receive the OTP? <span onClick={handleResendOtp} className="cursor-pointer text-[#822FFF]">Resend OTP</span></p> */}
        </div>
    </div>);
}

export default ModalResetPassword;