'use client'

import Button from "@/components/Button";
import InputField from "@/components/InputFeild";
import Loader from "@/components/Loader";
import { passwordRegex } from "@/constants";
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
    const [formErrors, setFormErrors] = useState<Record<string, string>>({
        password: "",
        confirmPassword: "",
    });
    const handleGetDataInput = (typeName: string, value: string) => {
        setFormErrors(prev => ({ ...prev, [typeName]: "" }));
        if (typeName === "password") setPassword(value);
        if (typeName === "confirmPassword") setConfirmPassword(value);
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
        if (!password && !confirmPassword) {
            setFormErrors(prev => ({ ...prev, password: "Please enter password", confirmPassword: "Please enter comfirm password" }));
            return;
        }
        if (!password) {
            setFormErrors(prev => ({ ...prev, password: "Please enter password" }));
            return;
        }
        if (!confirmPassword) {
            setFormErrors(prev => ({ ...prev, confirmPassword: "Please enter comfirm password" }));
            return;
        }

        if (!passwordRegex.test(password)) {
            setFormErrors(prev => ({ ...prev, password: "Please enter a valid password" }));
            return;
        }

        if (password && confirmPassword && confirmPassword !== password) {
            setFormErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
            return;
        }
        mutateResetPassword({ email: emailAuthen, newPassword: password });
    }

    const handleBlur = (typeName: string, value: string) => {
        if (!value.trim()) return;

        if (typeName === "password" && !passwordRegex.test(value)) {
            setFormErrors(prev => ({ ...prev, password: "Please enter a valid password" }));
        }
        if (typeName === "confirmPassword" && password && value !== password) {
            setFormErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
        }
        if (typeName === "password" && confirmPassword && value !== confirmPassword) {
            setFormErrors(prev => ({ ...prev, password: "Passwords do not match" }));
        }
    }

    return (<div className="max-w-[500px]">
        {isPendingResetPassword && (
            <Loader />
        )}
        <div className="mt-[20px] text-center bg-gradient-to-r from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent text-[46px] font-[700]">{t("setNewPassword")}</div>
        <div className="w-[70%] mx-auto mt-[20px]">
            <div>
                <InputField placeholder="Enter your new password" type="password" title="Password" name="password" onSave={(typeName, value) => handleGetDataInput(typeName, value)} onGetBlur={(typeName, value) => handleBlur(typeName, value)} />
                <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
                    {formErrors.password || "\u00A0"}
                </p>
            </div>
            <div>
                <InputField placeholder="Re-enter password" type="password" title="Confirm password" name="confirmPassword" onSave={(typeName, value) => handleGetDataInput(typeName, value)} onGetBlur={(typeName, value) => handleBlur(typeName, value)} />
                <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
                    {formErrors.confirmPassword || "\u00A0"}
                </p>
            </div>
        </div>

        <div className="flex-col mt-[10px] mb-[30px] mx-auto flex justify-center items-center">
            <Button title={t("updatePassword")} width="w-[70%]" height="h-[50px]" rounded="rounded-[12px]" onSubmit={handleUpdatePassword} boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" />
        </div>
    </div>);
}

export default ModalResetPassword;