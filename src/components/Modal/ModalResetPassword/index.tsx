'use client'

import Button from "@/components/Button";
import InputField from "@/components/InputFeild";
import Loader from "@/components/Loader";
import useTranslation from "@/hooks/useTranslation";
import { resetPassword } from "@/service/forgot-password";
import { useStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from 'react';

function ModalResetPassword() {

    const { t, locale } = useTranslation();
    const router = useRouter();
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const emailAuthen = useStore((state) => state.emailAuthen);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
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
        isPending: isPendingResetPassword
        // isError: mutationErrorResetPassword,
        // isSuccess: isSuccessResetPassword,
        // error: errorResetPassword,
    } = useMutation({
        mutationFn: resetPassword,
        onSuccess: (res) => {
            if (res.status === 200) {
                router.push(`/${locale}/success`);
            }
        },
        onError: (error) => {
            console.log(error.message || "Có lỗi xảy ra");
        }

    });

    const handleUpdatePassword = () => {
        mutateResetPassword({ email: emailAuthen, newPassword: password });
    }

    const handleBlur = (typeName: string, value: string) => {
        console.log(typeName, value);
    }

    return (<div className="max-w-[500px]">
        {isPendingResetPassword && (
            <Loader />
        )}
        <div className="mt-[20px] text-center bg-gradient-to-r from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent text-[46px] font-[700]">{t("setNewPassword")}</div>
        <div className="w-[70%] mx-auto mt-[20px]">
            <InputField placeholder="Enter your new password" type="password" title="Password" name="password" onSave={(typeName, value) => handleGetDataInput(typeName, value)} onGetBlur={(typeName, value) => handleBlur(typeName, value)} />
            <InputField placeholder="Re-enter password" type="password" title="Confirm password" name="confirmPassword" onSave={(typeName, value) => handleGetDataInput(typeName, value)} onGetBlur={(typeName, value) => handleBlur(typeName, value)} />
        </div>

        <div className="flex-col mb-[30px] mx-auto flex justify-center items-center">
            <Button title={t("updatePassword")} width="w-[70%]" height="h-[50px]" rounded="rounded-[12px]" onSubmit={handleUpdatePassword} boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" />
        </div>
    </div>);
}

export default ModalResetPassword;