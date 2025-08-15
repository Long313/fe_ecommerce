'use client'


import { useChangePassword } from "@/hooks/usePassword";
import axios from "axios";
import dynamic from "next/dynamic";
import { useState } from "react";
import { toast, Toaster } from 'react-hot-toast';
const Button = dynamic(
    () => import('@/components/Button'),
    { ssr: false }
);
const Input = dynamic(
    () => import('@/components/Input'),
    { ssr: false }
);
export default function ChangePassword() {
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });
    const [error, setError] = useState<string>("");
    const handleGetData = (name: string, value: string) => {
        setError("");
        setPasswords(prev => ({ ...prev, [name]: value }));
    };

    const handleDiscard = () => {
        setPasswords({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
        setError("");
    };
    const { mutate: changePassword } = useChangePassword();
    const handleSave = () => {
        const { currentPassword, newPassword, confirmNewPassword } = passwords;

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setError("Nhập đầy đủ mật khẩu hiện tại, mật khẩu mới và xác nhận mật khẩu mới");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setError("Mật khẩu mới và xác nhận mật khẩu mới phải trùng nhau");
            return;
        }

        if (currentPassword === newPassword) {
            setError("Mật khẩu mới và mật khẩu cũ không được trùng nhau");
            return;
        }

        changePassword(
            { currentPassword, newPassword },
            {
                onSuccess: () => toast.success("Thay đổi mật khẩu thành công!"),
                onError: (error) => {
                    if (axios.isAxiosError(error) && error.response?.status === 400) {
                        setError("Mật khẩu cũ nhập sai!");
                        toast.error("Thay đổi mật khẩu thất bại!");
                    } else {
                        toast.error("Đã xảy ra lỗi không xác định!");
                    }
                }
            }
        );
    };
    return (
        <div className="h-fit p-[2px] rounded-[4px] bg-gradient-to-b from-[#822FFF] to-[#FF35C4]">
            <div className="h-full rounded-[4px] bg-white dark:bg-black">
                <div className="p-[20px]">
                    <h1 className="text-[30px] font-bold bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
                        Change my password
                    </h1>
                    <div className="mt-[20px] w-[90%] mx-auto">
                        <Input minWidth="min-w-[200px]" defaultValue={passwords.currentPassword} title="Current password" name="currentPassword" type="password" onGetData={handleGetData} />
                        <Input minWidth="min-w-[200px]" defaultValue={passwords.newPassword} title="New password" name="newPassword" type="password" onGetData={handleGetData} />
                        <Input minWidth="min-w-[200px]" defaultValue={passwords.confirmNewPassword} title="Confirm new password" name="confirmNewPassword" type="password" onGetData={handleGetData} />
                        <p className="text-[red] text-center text-[12px] min-h-[20px] my-[10px]">{error}</p>
                    </div>
                    <div className="flex justify-end w-[80%] mx-auto mb-[40px]">
                        <button onClick={handleDiscard} className="cursor-pointer mr-[20px] bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent bg-white border border-[#C4C4C4] shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)] w-[100px] h-[36px] flex justify-center items-center rounded-[12px] hover:scale-101">
                            Discard
                        </button>
                        <Button title="Save" onSubmit={handleSave} width="w-[100px]" height="h-[36px]" boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" />
                    </div>
                </div>
            </div>
            <Toaster position="bottom-right" />
        </div>
    )
}