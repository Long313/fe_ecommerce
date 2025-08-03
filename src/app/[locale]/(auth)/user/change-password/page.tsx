'use client'

import Button from "@/components/Button";
import Input from "@/components/Input"
import { useState } from "react";

export default function ChangePassword() {
    const [password, setPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

    const handleGetData = (name: string, value: string) => {
        switch (name) {
            case "password":
                setPassword(value);
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

    const handleDiscard = () => {
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
    };

    const handleSave = () => {
    }
    return (
        <div className="h-fit p-[2px] rounded-[4px] bg-gradient-to-b from-[#822FFF] to-[#FF35C4]">
            <div className="h-full rounded-[4px] bg-white dark:bg-black">
                <div className="p-[20px]">
                    <h1 className="text-[30px] font-bold bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
                        Change my password
                    </h1>
                    <div className="mt-[20px] w-[90%] mx-auto">
                        <Input minWidth="min-w-[200px]" defaultValue={password} title="Current password" name="password" type="password" onGetData={handleGetData} />
                        <Input minWidth="min-w-[200px]" defaultValue={newPassword} title="New password" name="newPassword" type="password" onGetData={handleGetData} />
                        <Input minWidth="min-w-[200px]" defaultValue={confirmNewPassword} title="Confirm new password" name="confirmNewPassword" type="password" onGetData={handleGetData} />
                    </div>
                    <div className="flex justify-end w-[80%] mx-auto my-[40px]">
                        <button onClick={handleDiscard} className="cursor-pointer mr-[20px] bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent bg-white border border-[#C4C4C4] shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)] w-[100px] h-[36px] flex justify-center items-center rounded-[12px] hover:scale-101">
                            Discard
                        </button>
                        <Button title="Save" onSubmit={handleSave} width="w-[100px]" height="h-[36px]" boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" />
                    </div>
                </div>
            </div>
        </div>
    )
}