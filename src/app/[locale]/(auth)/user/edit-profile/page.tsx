'use client'

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useGetUser, useUpdateUser } from "@/hooks/useUser";
import { useStore } from "@/store/store";
import Image from "next/image"
import { useEffect, useRef, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { toast, Toaster } from 'react-hot-toast';

export default function EditProfile() {
    const { userInfor, setUserInfor } = useStore();
    const { id, avatar, fullname, phone_number, gender, birthday, address } = userInfor;

    const [form, setForm] = useState({
        name: fullname || "",
        birthday: birthday ? formatDateToInput(birthday) : "",
        address: address || "",
        phone: phone_number || "",
        gender: gender || "",
    });

    const [previewAvatar, setPreviewAvatar] = useState<string | null>(avatar || null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data: userData } = useGetUser(id ?? "");
    const { mutate: updateUser } = useUpdateUser();

    useEffect(() => {
        if (userData?.data) {
            const u = userData.data;
            setUserInfor(u);

            setForm({
                name: u.fullname || "",
                birthday: u.birthday ? formatDateToInput(u.birthday) : "",
                address: u.address || "",
                phone: u.phone_number || "",
                gender: u.gender || "",
            });

            setPreviewAvatar(u.avatar_url || null);
        }
    }, [userData]);

    const handleGetData = (name: string, value: string) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const formData = new FormData();
        if (form.name) formData.append("fullname", form.name);
        if (form.birthday) formData.append("birthday", form.birthday);
        if (form.address) formData.append("address", form.address);
        if (form.phone) formData.append("phoneNumber", form.phone);
        if (form.gender) formData.append("gender", form.gender);
        if (avatarFile) formData.append("avatar", avatarFile);

        updateUser(formData, {
            onSuccess: () => toast.success('Cập nhật thông tin thành công!'),
            onError: () => toast.error('Cập nhật thông tin thất bại!'),
        });
    };

    const handleDiscard = () => {
        setForm({
            name: fullname || "",
            birthday: birthday ? formatDateToInput(birthday) : "",
            address: address || "",
            phone: phone_number || "",
            gender: gender || "",
        });
        setPreviewAvatar(avatar || null);
        setAvatarFile(null);
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (previewAvatar) URL.revokeObjectURL(previewAvatar); // cleanup URL cũ
            const url = URL.createObjectURL(file);
            setAvatarFile(file);
            setPreviewAvatar(url);
        }
    };

    function getInitials(name: string): string {
        const words = name.trim().split(" ");
        if (words.length === 1) return words[0].charAt(0).toUpperCase();
        return words[0].charAt(0).toUpperCase() + words[words.length - 1].charAt(0).toUpperCase();
    }

    function formatDateToInput(dateString: string) {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }

    return (
        <div className="h-fit p-[2px] rounded-[4px] bg-gradient-to-b from-[#822FFF] to-[#FF35C4]">
            <div className="h-full rounded-[4px] bg-white dark:bg-black p-[20px]">
                <h1 className="text-[30px] font-bold bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
                    Profile
                </h1>

                <div className="flex flex-row justify-start mt-[40px]">
                    <div className="p-[2px] rounded-full bg-gradient-to-b from-[#822FFF] to-[#FF35C4] w-[100px] h-[100px] relative">
                        {previewAvatar ? (
                            <Image
                                src={previewAvatar}
                                alt="avatar"
                                width={96}
                                height={96}
                                className="rounded-full object-cover w-full h-full"
                            />
                        ) : (
                            <div className="w-[96px] h-[96px] rounded-full bg-gray-300 flex items-center justify-center text-white text-[36px] font-bold">
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
                    <Input star={false} defaultValue={form.name} title="Name" name="name" type="string" onGetData={handleGetData} />
                    <Input star={false} defaultValue={form.birthday} title="Birthday" name="birthday" type="date" onGetData={handleGetData} />
                    <Input star={false} defaultValue={form.address} title="Address" name="address" type="string" onGetData={handleGetData} />
                    <Input star={false} defaultValue={form.phone} title="Phone" name="phone" type="string" onGetData={handleGetData} />
                    <Input star={false} defaultValue={form.gender} dataSelect={[
                        { label: "Male", value: "men" },
                        { label: "Female", value: "women" },
                        { label: "Unisex", value: "unisex" },
                    ]} title="Gender" name="gender" type="string" onGetData={handleGetData} />
                </div>

                <div className="flex justify-end w-[80%] mx-auto my-[40px]">
                    <button
                        onClick={handleDiscard}
                        className="mr-[20px] bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent border border-[#C4C4C4] shadow-md w-[100px] h-[36px] rounded-[12px]"
                    >
                        Discard
                    </button>
                    <Button title="Save" onSubmit={handleSave} width="w-[100px]" height="h-[36px]" boxShadow="shadow-md" />
                </div>
            </div>
            <Toaster position="bottom-right" />
        </div>
    );
}
