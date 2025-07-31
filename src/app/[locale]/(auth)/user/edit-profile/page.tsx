'use client'

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useStore } from "@/store/store";
import Image from "next/image"
import { useEffect, useRef, useState } from "react";
import { CiCamera } from "react-icons/ci";

export default function EditProfile() {
    const userInfor = useStore(state => state.userInfor);
    const [name, setName] = useState<string>("");
    const [birthday, setBirthday] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const { avatar, fullname, phone_number, gender: genderUser, email: emailUser, birthday: birthdayUser, address: addressUser } = userInfor;

    function getInitials(name: string): string {
        const words = name.trim().split(" ");
        if (words.length === 1) return words[0].charAt(0).toUpperCase();
        return (
            words[0].charAt(0).toUpperCase() +
            words[words.length - 1].charAt(0).toUpperCase()
        );
    }

    useEffect(() => {
        if (fullname) setName(fullname);
        if (birthdayUser) setBirthday(birthdayUser);
        if (emailUser) setEmail(emailUser);
        if (addressUser) setAddress(addressUser);
        if (phone_number) setPhone(phone_number);
        if (genderUser) setGender(genderUser);
    }, [userInfor])

    const handleGetData = (name: string, value: string) => {
        switch (name) {
            case "name":
                setName(value);
                break;
            case "birthday":
                setBirthday(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "address":
                setAddress(value);
                break;
            case "phone":
                setPhone(value);
                break;
            case "gender":
                setGender(value);
                break;
            default:
                return;
        }
    }

    const handleSave = () => {
        console.log(name, birthday, email, address, phone, gender);
        // TODO: Submit data (including previewAvatar) to backend if needed
    }

    const handleDiscard = () => {
        setPreviewAvatar(null);
        // reset other states if needed
    }

    const handleImageClick = () => {
        fileInputRef.current?.click();
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewAvatar(url);

            // TODO: Optionally store the file object to upload to backend
            // setAvatarFile(file)
        }
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
                            {previewAvatar || avatar ? (
                                <Image
                                    src={(previewAvatar ?? avatar) as string}
                                    alt="avatar"
                                    width={96}
                                    height={96}
                                    className="rounded-full object-cover w-full h-full"
                                />
                            ) : (
                                <div className="w-[96px] h-[96px] rounded-full bg-gray-300 flex items-center justify-center text-white text-[36px] font-bold tracking-widest">
                                    {getInitials(fullname ?? "USER")}
                                </div>
                            )}
                            <div
                                onClick={handleImageClick}
                                className="cursor-pointer absolute right-0 bottom-[4px] z-20 w-[30px] h-[30px] rounded-full border border-[#FF35C4] bg-white flex justify-center items-center"
                            >
                                <CiCamera color="#FF35C4" size={20} />
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    <div className="mt-[20px] w-[80%] mx-auto">
                        <Input defaultValue={name} title="Name" name="name" type="string" onGetData={handleGetData} />
                        <Input defaultValue={birthday} title="Birthday" name="birthday" type="date" onGetData={handleGetData} />
                        <Input defaultValue={email} title="Email" name="email" type="string" onGetData={handleGetData} />
                        <Input defaultValue={address} title="Address" name="address" type="string" onGetData={handleGetData} />
                        <Input defaultValue={phone} title="Phone" name="phone" type="string" onGetData={handleGetData} />
                        <Input defaultValue={gender} title="Gender" name="gender" type="string" onGetData={handleGetData} />
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
