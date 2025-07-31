'use client'

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useStore } from "@/store/store";
import Image from "next/image"
import { useState } from "react";
import { CiCamera } from "react-icons/ci";

export default function EditProfile() {
    const userInfor = useStore(state => state.userInfor);
    const [name, setName] = useState<string | number>("");
    const [birthday, setBirthday] = useState<string | number>("");
    const [email, setEmail] = useState<string | number>("");
    const [address, setAddress] = useState<string | number>("");
    const [phone, setPhone] = useState<string | number>("");
    const [gender, setGender] = useState<string | number>("");
    const { avatar, fullname, phone_number, gender: genderUser, email: emailUser, birthday: birthdayUser, address: addressUser } = userInfor;

    function getInitials(name: string): string {
        const words = name.trim().split(" ");
        if (words.length === 1) return words[0].charAt(0).toUpperCase();
        return (
            words[0].charAt(0).toUpperCase() +
            words[words.length - 1].charAt(0).toUpperCase()
        );
    }

    const handleGetData = (name: string, value: string | number) => {
        switch (name) {
            case "name":
                setName(value);
                break;
            case "name":
                setBirthday(value);
                break;
            case "name":
                setEmail(value);
                break;
            case "name":
                setAddress(value);
                break;
            case "name":
                setPhone(value);
                break;
            case "name":
                setGender(value);
                break;

        }
    }

    const handleSave = () => {

    }

    const handleDiscard = () => {

    }
    return (
        <div className="h-fit p-[2px] rounded-[4px] bg-gradient-to-b from-[#822FFF] to-[#FF35C4]">
            <div className="h-full rounded-[4px] bg-white dark:bg-black">
                <div className="p-[20px]">
                    <h1 className="text-[30px] font-bold bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
                        Profile
                    </h1>
                    <div className="flex flex-row justify-start mt-[40px]">
                        <div className="p-[2px] rounded-full bg-gradient-to-b from-[#822FFF] to-[#FF35C4] w-[100px] h-[100px] relative">
                            {avatar ? (
                                <Image
                                    src={avatar}
                                    alt="avatar"
                                    width={96}
                                    height={96}
                                    className="rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-[96px] h-[96px] rounded-full bg-gray-300 flex items-center justify-center text-white text-[36px] font-bold tracking-widest">
                                    {getInitials(fullname ?? "USER")}
                                </div>
                            )}
                            <div className="cursor-pointer absolute right-0 bottom-[4px] z-20 w-[30px] h-[30px] rounded-full border border-[#FF35C4] bg-white flex justify-center items-center">
                                <CiCamera color="#FF35C4" size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-[20px] w-[80%] mx-auto">
                        <Input title="Name" name="name" type="string" onGetData={handleGetData} />
                        <Input title="Birthday" name="birthday" type="string" onGetData={handleGetData} />
                        <Input title="Email" name="string" type="string" onGetData={handleGetData} />
                        <Input title="Address" name="address" type="string" onGetData={handleGetData} />
                        <Input title="Phone" name="phone" type="string" onGetData={handleGetData} />
                        <Input title="Gender" name="gender" type="string" onGetData={handleGetData} />
                    </div>
                    <div className="flex justify-end w-[80%] mx-auto my-[40px]">
                        <button onClick={handleDiscard} className="cursor-pointer mr-[20px] bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent bg-white border border-[#C4C4C4] shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)] w-[100px] h-[36px] flex justify-center items-center rounded-[12px] hover:scale-101">
                            Discard
                        </button>
                        <Button title="Save" onSubmit={handleSave} width="w-[100px]" height="h-[36px]" boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" />
                    </div>
                </div>
            </div>
        </div >
    )
}