import InputComponent from '@/components/Input';
import { CATEGORIES_LIST, GENDERS_LIST, PORT_API } from '@/constants';
import { getDetailProduct } from '@/service/product';
import { useMutation } from '@tanstack/react-query';
import type { StaticImageData } from 'next/image';
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import place_holder_img from '../../images/place_holder_product.png';
import Button from "../Button";
import { ProductDetailProps } from '@/common/type';

type ProductPopupProps = {
    open: boolean,
    id: string,
    typePopup: string,
    onClose: () => void;
    onGetData: (type: string, data: ProductDetailProps) => void;
};

export default function ProductPopup(props: ProductPopupProps) {
    const { open, id, typePopup, onClose, onGetData } = props;
    const [image, setImage] = useState<string | StaticImageData>(place_holder_img);
    const [imageFile, setImageFile] = useState<File | string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const resetField = () => {
        setName("");
        setGender("");
        setCategory("");
        setType("");
        setPrice("");
        setDescription("");
        setImage(place_holder_img);
        setImageFile(null);
    }

    const handleSave = () => {
        if (typePopup === "edit") {
            onGetData(typePopup, { id, name, gender, category, type, price, description, image: imageFile });
        } else {
            onGetData(typePopup, { name, gender, category, type, price, description, image: imageFile });
        }
        onClose();
        resetField();
    };


    const handleDiscard = () => {
        onClose();
        resetField();
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            setImageFile(file);
        }
    };

    const handleClickUpload = () => {
        fileInputRef.current?.click();
    };

    const handleGetData = (name: string, value: string) => {
        switch (name) {
            case "name":
                setName(value);
                break;
            case "gender":
                setGender(value);
                break;
            case "category":
                setCategory(value);
                break;
            case "type":
                setType(value);
                break;
            case "price":
                setPrice(value);
                break;
            case "description":
                setDescription(value);
                break;
            default:
                return;
        }
    }

    useEffect(() => {
        if (open) {
            if (typePopup === "edit" && id) {
                mutate(id);
            } else if (typePopup === "create") {
                resetField();
            }
        }
    }, [open, id, typePopup]);

    const { mutate } = useMutation({
        mutationFn: getDetailProduct,
        onSuccess: (res) => {
            if (res.status === 200) {
                const { name, gender, category, type, price, description, image_url } = res.data;
                setName(name);
                setGender(gender);
                setCategory(category);
                setType(type);
                setPrice(price);
                setDescription(description);
                const fullImageUrl = `${PORT_API}${image_url}`;
                setImage(fullImageUrl);
                setImageFile(fullImageUrl);
            };
        },
        onError: (error: { status: number, message: string }) => {
            console.log(error);
        }
    });

    return (
        <div className={`${open ? "block" : "hidden"} fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-[rgb(0,0,0,0.2)]`}>
            <div className="bg-white w-[700px] h-max rounded-[8px] py-[20px] px-[30px]">
                <h1 className="font-[700] text-[20px] uppercase text-center">{typePopup === "edit" ? "Update Product" : "Create New Product"}</h1>
                <div className="mb-[20px]">
                    <div className="flex justify-between">
                        <div className="flex flex-col items-center w-[45%] mt-[30px]">
                            <div className="w-[260px] h-[300px] relative  border border-[#C4C4C4]">
                                <Image src={image} alt="product_preview" fill className="object-cover rounded-[4px]" />
                            </div>
                            <div
                                onClick={handleClickUpload}
                                className="rounded-[8px] border border-[#C4C4C4] py-[4px] px-[8px] flex mx-auto items-center justify-center my-[10px] cursor-pointer hover:bg-gray-100"
                            >
                                <span className="mr-[10px]">Upload</span>
                                <MdOutlineFileUpload size={20} />
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                ref={fileInputRef}
                                className="hidden"
                            />
                        </div>
                        <div className="flex-1 flex flex-col">
                            <InputComponent width="w-full" minWidth='min-w-[90px]' star={false} defaultValue={name} title="Name" name="name" type="string" onGetData={(name, value) => handleGetData(name, value)} />
                            <InputComponent width="w-full" minWidth='min-w-[90px]' star={false} defaultValue={gender} dataSelect={GENDERS_LIST} title="Gender" name="gender" type="string" onGetData={(name, value) => handleGetData(name, value)} />
                            <InputComponent width="w-full" minWidth='min-w-[90px]' star={false} defaultValue={category} dataSelect={CATEGORIES_LIST} title="Category" name="category" type="string" onGetData={(name, value) => handleGetData(name, value)} />
                            <InputComponent width="w-full" minWidth='min-w-[90px]' star={false} defaultValue={type} title="Type" name="type" type="string" onGetData={(name, value) => handleGetData(name, value)} />
                            <InputComponent width="w-full" minWidth='min-w-[90px]' star={false} defaultValue={price} title="Price" name="price" type="string" onGetData={(name, value) => handleGetData(name, value)} />
                            <InputComponent width="w-full" minWidth='min-w-[90px]' star={false} defaultValue={description} title="Description" name="description" type="string" onGetData={(name, value) => handleGetData(name, value)} />
                        </div>
                    </div>
                    <div>

                    </div>
                </div>

                <div className="flex justify-end mt-auto">
                    <button
                        onClick={handleDiscard}
                        className="cursor-pointer mr-[20px] bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent bg-white border border-[#C4C4C4] shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)] w-[100px] h-[36px] flex justify-center items-center rounded-[12px] hover:scale-101"
                    >
                        Discard
                    </button>
                    <Button
                        title="Save"
                        onSubmit={handleSave}
                        width="w-[100px]"
                        height="h-[36px]"
                        boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]"
                    />
                </div>
            </div>
        </div>
    );
}
