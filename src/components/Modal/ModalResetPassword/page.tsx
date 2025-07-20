'use client'

import Button from "@/components/Button/page";
import InputField from "@/components/InputFeild/page";
import Loader from "@/components/Loader/page";
import useTranslation from "@/hooks/useTranslation";
import { resetPassword } from "@/service/forgot-password";
import { useStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from 'react';

function ModalResetPassword() {

    const otpLength = 4;
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
                router.push(`/${locale}/success`);
            }
        },
        onError: (error: any) => {
            console.log(error.message || "Có lỗi xảy ra");
        }

    });

    const handleUpdatePassword = () => {
        // if (Object.keys(formErrors).length > 0) return;
        mutateResetPassword({ email: emailAuthen, newPassword: password });
    }

    return (<div className="max-w-[500px]">
        {isPendingResetPassword && (
            <Loader />
        )}
        {/* <div className="flex justify-between"><p className="text-[#751872]">{t("registerTitle")}</p><X color="#9135FA" className="cursor-pointer" onClick={handleCloseModal} /></div> */}
        <div className="mt-[20px] text-center bg-gradient-to-r from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent text-[46px] font-[700]">{t("setNewPassword")}</div>
        {/* <div className="flex flex-col items-center mt-[10px]">
            <p className="text-[16px] text-[#636364] text-center">{t("enterMail")}</p>
        </div> */}
        <div className="w-[70%] mx-auto mt-[20px]">
            <InputField placeholder="Enter your new password" type="password" title="Password" name="password" onSave={(typeName, value) => handleGetDataInput(typeName, value)} getError={formErrors} />
            <InputField placeholder="Re-enter password" type="password" title="Confirm password" name="confirmPassword" onSave={(typeName, value) => handleGetDataInput(typeName, value)} getError={formErrors} />
        </div>

        <div className="flex-col mb-[30px] mx-auto flex justify-center items-center">
            <Button title={t("updatePassword")} width="w-[70%]" height="h-[50px]" rounded="rounded-[12px]" onSubmit={handleUpdatePassword} boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" />
            {/* <p className="text-[14px] mt-[10px] text-[#B9B9B9]">Didn’t you receive the OTP? <span onClick={handleResendOtp} className="cursor-pointer text-[#822FFF]">Resend OTP</span></p> */}
        </div>
    </div>);
}

export default ModalResetPassword;