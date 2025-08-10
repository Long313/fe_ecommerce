'use client'

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useChangePassword } from "@/hooks/usePassword";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, Toaster } from 'react-hot-toast';

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const handleGetData = (name: string, value: string) => {
        setError("");
        switch (name) {
            case "currentPassword":
                setCurrentPassword(value);
                break;
            case "newPassword":
                setNewPassword(value);
                break;
            case "confirmNewPassword":
                setConfirmNewPassword(value);
                break;
            default:
                return;
        }
    };

    useEffect(() => {
        setError("")
    }, [])

    const handleDiscard = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setError("")
    };
    const { mutate: changePassword } = useChangePassword();
    const handleSave = () => {
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setError("Nhập đầy đủ mật khẩu hiện tại, mật khẩu mới và xác nhận mật khẩu mới")
        } else if (newPassword !== confirmNewPassword) {
            setError("Mật khẩu mới và xác nhận mật khẩu mới phải trùng nhau");
        } else if (currentPassword === newPassword) {
            setError("Mật khẩu mới và mật khẩu cũ không được trùng nhau")
        } else if (currentPassword && newPassword && confirmNewPassword && newPassword === confirmNewPassword) {
            changePassword(
                { currentPassword, newPassword },
                {
                    onSuccess: () => {
                        toast.success('Thay đổi mật khẩu thành công!');
                    },
                    onError: (error) => {
                        if (axios.isAxiosError(error)) {
                            if (error.response?.status === 400) {
                                toast.error('Thay đổi mật khẩu thất bại!');
                                setError('Mật khẩu cũ nhập sai!');
                            } else {
                                toast.error('Thay đổi mật khẩu thất bại!');
                            }
                        } else {
                            toast.error('Đã xảy ra lỗi không xác định!');
                        }
                    }
                }
            );
        }
    }
    return (
        <div className="h-fit p-[2px] rounded-[4px] bg-gradient-to-b from-[#822FFF] to-[#FF35C4]">
            <div className="h-full rounded-[4px] bg-white dark:bg-black">
                <div className="p-[20px]">
                    <h1 className="text-[30px] font-bold bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
                        Change my password
                    </h1>
                    <div className="mt-[20px] w-[90%] mx-auto">
                        <Input minWidth="min-w-[200px]" defaultValue={currentPassword} title="Current password" name="currentPassword" type="password" onGetData={handleGetData} />
                        <Input minWidth="min-w-[200px]" defaultValue={newPassword} title="New password" name="newPassword" type="password" onGetData={handleGetData} />
                        <Input minWidth="min-w-[200px]" defaultValue={confirmNewPassword} title="Confirm new password" name="confirmNewPassword" type="password" onGetData={handleGetData} />
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