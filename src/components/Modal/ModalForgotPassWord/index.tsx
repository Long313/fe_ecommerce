import Button from "@/components/Button";
import InputField from "@/components/InputFeild";
import Loader from "@/components/Loader";
import { emailRegex } from "@/constants";
import useTranslation from "@/hooks/useTranslation";
import { forgotPassword } from "@/service/forgot-password";
import { useStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from 'react';

function ModalForgotPassWord() {
    const [error, setError] = useState<string>("")
    const { t, locale } = useTranslation();
    const router = useRouter();
    const [email, setMail] = useState<string>("");
    const { setEmailAuthen, setTypeOtpAuthen } = useStore();

    const handleVerifyOtp = () => {
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email");
            return;
        }
        mutateResetPassword({ email });
        setEmailAuthen(email);
        setTypeOtpAuthen("reset")
    }

    const {
        mutate: mutateResetPassword,
        isPending: isPendingResetPassword
        // isError: mutationErrorResetPassword,
        // isSuccess: isSuccessResetPassword,
        // error: errorResetPassword,
    } = useMutation({
        mutationFn: forgotPassword,
        onSuccess: (res) => {
            if (res.status === 200) {
                router.push(`/${locale}/otp`);
            } else {
                setError("User not exist")
            }
        },
        onError: (error) => {
            console.log(error)
            setError("User not exist")
        }

    });

    const handleGetDataInput = (typeName: string, value: string) => {
        setError("")
        setMail(value);
        console.log(typeName);
    }

    const handleBlur = (typeName: string, value: string) => {
        if (!value.trim()) return;
        if (typeName === "email" && !emailRegex.test(value)) {
            setError("Please enter a valid email");
        }
    }

    return (<div className="max-w-[700px]">
        {isPendingResetPassword && (
            <Loader />
        )}
        {/* <div className="flex justify-between"><p className="text-[#751872]">{t("registerTitle")}</p><X color="#9135FA" className="cursor-pointer" onClick={handleCloseModal} /></div> */}
        <div className="mt-[20px] text-center bg-gradient-to-r from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent text-[46px] font-[700]">{t("forgotPassword")}</div>
        <div className="flex flex-col items-center mt-[10px]">
            <p className="text-[16px] text-[#636364] text-center">{t("enterMail")}</p>
        </div>
        <div className="w-[70%] mx-auto mt-[20px]">
            <InputField placeholder="Enter your email" star={false} title="Email" name="email" onSave={(typeName, value) => handleGetDataInput(typeName, value)} onGetBlur={(typeName, value) => handleBlur(typeName, value)} />
            <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
                {error || "\u00A0"}
            </p>
        </div>

        <div className="flex-col mt-[20px] mb-[30px] mx-auto flex justify-center items-center">
            <Button title={t("confirm")} width="w-[70%]" height="h-[40px]" rounded="rounded-[12px]" onSubmit={handleVerifyOtp} boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" />
            {/* <p className="text-[14px] mt-[10px] text-[#B9B9B9]">Didn’t you receive the OTP? <span onClick={handleResendOtp} className="cursor-pointer text-[#822FFF]">Resend OTP</span></p> */}
        </div>
    </div>);
}

export default ModalForgotPassWord;