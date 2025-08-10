'use client';
import { addressListProps } from "@/common/type";
import Button from "@/components/Button";
import InputField from "@/components/InputFeild";
import PromoCodePopup from "@/components/PromoCodePopup";
import { useStore } from "@/store/store";
import { useEffect, useState } from "react";

export default function Checkout() {
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [ward, setWard] = useState<string>("");
    const [district, setDistrict] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const userInfor = useStore((state) => state.userInfor);
    const promoCodeUser = useStore((state) => state.promoCodeName);
    const { email: emailUser, phone_number: phoneUser, fullname: fullnameUser, address: addressUser } = userInfor;
    useEffect(() => {
        const listAddress: addressListProps[] = JSON.parse(localStorage.getItem("addressBookStore") || "[]");
        if (listAddress.length > 0) {
            const result = listAddress.find((item: addressListProps) => item.default);
            if (result) {
                setStreet(result?.street);
                setWard(result?.ward);
                setDistrict(result?.district);
                setCity(result?.city);
            }
        }
    }, [])
    const handleGetDataInput = (typeName: string, value: string) => {
        switch (typeName) {
            case "email":
                setEmail(value);
                break;
            case "phone":
                setPhone(value);
                break;
            case "fullName":
                setFullName(value);
                break;
            case "street":
                setStreet(value);
                break;
            case "ward":
                setWard(value);
                break;
            case "district":
                setDistrict(value);
                break;
            case "city":
                setCity(value);
                break;
            default:
                return;
        }
    }

    useEffect(() => {
        if (promoCodeUser) setPromoCode(promoCodeUser);
    }, [promoCodeUser])


    const [promoCode, setPromoCode] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const handleClosePopup = () => {
        setOpen(false);
    }

    const handleGetData = (data: string) => {

    }

    const handleGetPromoCode = () => {
        setOpen(true);
    };

    return (
        <div className="w-full h-full mt-[120px] mb-[200px] px-[var(--padding-screen)] flex">
            <div className="">
                <div className="border-b border-[#E5E5E5] pb-[40px]">
                    <h2 className="font-[600] text-[20px] mb-[40px]">DELIVERY</h2>
                    <div className="w-full flex justify-between">
                        <div>
                            <InputField star={false} valueDefault={email ? email : emailUser} title="Email" type="email" name="email" onSave={(typeName, value) => handleGetDataInput(typeName, value)} />
                        </div>
                        <div className="ml-[20px]">
                            <InputField star={false} valueDefault={phone ? phone : phoneUser} title="Phone Number" type="string" name="phone" onSave={(typeName, value) => handleGetDataInput(typeName, value)} />
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <div>
                            <InputField star={false} valueDefault={fullName ? fullName : fullnameUser} title="Full Name" type="string" name="name" onSave={(typeName, value) => handleGetDataInput(typeName, value)} />
                        </div>
                        <div className="ml-[20px]">
                            <InputField star={false} valueDefault={city ? city : ""} title="City" type="string" name="city" onSave={(typeName, value) => handleGetDataInput(typeName, value)} />
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <div>
                            <InputField star={false} valueDefault={district ? district : ""} title="District" type="string" name="district" onSave={(typeName, value) => handleGetDataInput(typeName, value)} />
                        </div>
                        <div className="ml-[20px]">
                            <InputField star={false} valueDefault={ward ? ward : ""} title="Ward" type="string" name="ward" onSave={(typeName, value) => handleGetDataInput(typeName, value)} />
                        </div>

                    </div>
                    <div className="w-full flex justify-between">
                        <div className="">
                            <InputField star={false} valueDefault={street ? street : ""} title="Street" type="string" name="address" onSave={(typeName, value) => handleGetDataInput(typeName, value)} />
                        </div>
                    </div>
                </div>
                <div className="border-b border-[#E5E5E5] mt-[20px] pb-[40px]">
                    <h2 className="font-[600] text-[20px] mb-[40px]">SHIPPING</h2>
                    <p className="text-[636364]">10$ Shipping</p>
                    <p className="my-[10px] text-[636364]">Shipment One</p>
                    <p className="text-[636364]">Arrives Fri, Aug 1 - Sun, Aug 3</p>
                </div>
                <div className="border-b border-[#E5E5E5] mt-[20px] pb-[40px]">
                    <h2 className="font-[600] text-[20px] mb-[40px]">PAYMENT</h2>
                    <div>
                        <p className="text-[#636364] mb-[20px]">Have a promo code?</p>
                        <div className="w-[60%] flex items-center h-[36px] gap-x-[20px]">
                            <InputField isError={false} star={false} title="" valueDefault={promoCode ? promoCode : ""} onSave={(typeName, value) => handleGetDataInput(typeName, value)} name="promo_code" type="string" placeholder="Promo" />
                            <Button title="ADD" onSubmit={handleGetPromoCode} width="w-[120px]" height="h-full" margin="mt-[8px]" boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" />
                        </div>
                    </div>

                </div>
            </div>
            <div className="w-[30%] ml-[40px]">
                <h2 className="font-[600] text-[20px] mb-[40px]">ORDER SUMMARY</h2>

            </div>
            <PromoCodePopup open={open} onClose={handleClosePopup} />
        </div>)
}