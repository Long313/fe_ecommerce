import InputComponent from '@/components/Input';
import type { StaticImageData } from 'next/image';
import Image from "next/image";
import { useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import place_holder_img from '../../images/place_holder_product.png';
import Button from "../Button";
import { CATEGORIES_LIST, GENDERS_LIST } from '@/constants';
import PriceInput from '../PriceInput';

type ProductPopupProps = {
    open: boolean,
    id: string | number,
    typePopup: string,
    onClose: () => void;
};

export default function ProductPopup(props: ProductPopupProps) {
    const { open, id, typePopup, onClose } = props;
    const [image, setImage] = useState<string | StaticImageData>(place_holder_img);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [search, setSearch] = useState<string>("");
    const [gender, setGender] = useState<string[]>([]);
    const [category, setCategory] = useState<string[]>([]);
    const [type, setType] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const handleSave = () => {
        onClose();

    };

    const handleDiscard = () => {
        onClose();
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    const handleClickUpload = () => {
        fileInputRef.current?.click();
    };

    const handleGetData = (name: string, value: string) => {
        switch (name) {
            case "search":
                setSearch(value);
                break;
            case "gender":
                setGender(pre => [...pre, value]);
                break;
            case "category":
                setCategory(pre => [...pre, value]);
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

    return (
        <div className={`${open ? "block" : "hidden"} fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-[rgb(0,0,0,0.2)]`}>
            <div className="bg-white w-[700px] h-max rounded-[8px] py-[20px] px-[30px]">
                <h1 className="font-[700] text-[20px] uppercase text-center">{type === "edit" ? "Update Product" : "Create New Product"}</h1>
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
                            <InputComponent width="w-full" minWidth='min-w-[90px]' star={false} defaultValue={search} title="Name" name="search" type="string" onGetData={(name, value) => handleGetData(name, value)} />
                            <InputComponent width="w-full" minWidth='min-w-[90px]' star={false} defaultValue={gender[0]} dataSelect={GENDERS_LIST} title="Gender" name="gender" type="string" onGetData={(name, value) => handleGetData(name, value)} />
                            <InputComponent width="w-full" minWidth='min-w-[90px]' star={false} defaultValue={category[0]} dataSelect={CATEGORIES_LIST} title="Category" name="category" type="string" onGetData={(name, value) => handleGetData(name, value)} />
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
