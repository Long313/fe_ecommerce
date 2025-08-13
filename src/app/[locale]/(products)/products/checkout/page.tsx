'use client';
import { addressListProps, ProductDetailProps } from "@/common/type";
import Button from "@/components/Button";
import InputField from "@/components/InputFeild";
import PromoCodePopup from "@/components/PromoCodePopup";
import { emailRegex, phoneRegex } from "@/constants";
import google from '@/images/icon_google.png';
import item_img from '@/images/item.svg';
import mdi_voucher from '@/images/mdi_voucher.svg';
import paypal from '@/images/paypal_logo.svg';
import { useStore } from "@/store/store";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast, Toaster } from 'react-hot-toast';
import { MdCreditCard } from "react-icons/md";

export default function Checkout() {
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [ward, setWard] = useState<string>("");
    const [district, setDistrict] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [typePayment, setTypePayment] = useState<string>("credit");
    const [nameCard, setNameCard] = useState<string>("");
    const [numberCard, setNumberCard] = useState<string>("");
    const [dateCard, setDateCard] = useState<string>("");
    const [cvvCard, setCvvCard] = useState<string>("");
    const [listProduct, setListProduct] = useState<ProductDetailProps[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [totalDiscount, setTotalDiscount] = useState<number>(0);
    const [promoCode, setPromoCode] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    // const [errorInfor, setErrorInfor] = useState<string>("");
    // const [errorCard, setErrorCard] = useState<string>("");
    const [formErrors, setFormErrors] = useState<Record<string, string>>({
        email: "",
        phone: "",
        fullName: "",
        street: "",
        ward: "",
        district: "",
        city: "",
        nameCard: "",
        numberCard: "",
        dateCard: "",
        cvvCard: "",
    });
    const shippingFee = 10;

    const userInfor = useStore((state) => state.userInfor);
    const promoCodeName = useStore((state) => state.promoCodeName);
    const promoCodeValue = useStore((state) => state.promoCodeValue);
    const { email: emailUser, phone_number: phoneUser, fullname: fullNameUser } = userInfor;
    useEffect(() => {
        if (emailUser) setEmail(emailUser);
        if (phoneUser) setPhone(phoneUser);
        if (fullNameUser) setFullName(fullNameUser);
    }, [userInfor])
    const inforRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

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
    }, []);

    useEffect(() => {
        if (promoCodeName) setPromoCode(promoCodeName);
    }, [promoCodeName]);

    useEffect(() => {
        let tempTotal = 0;
        listProduct.forEach(item => {
            tempTotal += Number(item.price) * Number(item.quantity);
        });
        setTotal(tempTotal);
    }, [listProduct]);

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem("bag") || "[]");
        setListProduct(list);
    }, []);

    function extractDiscountValue(text: string): { value: number, isPercent: boolean } | null {
        const match = text.match(/(-)?\s*\$?\s*(\d+)(%)?/);

        if (match) {
            const number = parseInt(match[2], 10);
            const isPercent = match[3] === "%";

            const value = number;

            return { value, isPercent };
        }

        return null;
    }

    useEffect(() => {
        const value = extractDiscountValue(promoCodeValue);
        const subtotalWithShipping = total + shippingFee;
        if (value?.isPercent === true) {
            const discount = (subtotalWithShipping * value.value) / 100;
            setTotalDiscount(subtotalWithShipping - discount);
        } else if (value?.isPercent === false) {
            setTotalDiscount(subtotalWithShipping - value.value);
        } else {
            setTotalDiscount(subtotalWithShipping);
        }
    }, [total, promoCodeValue]);

    const handleClosePopup = () => {
        setOpen(false);
    };

    const handleGetPromoCode = () => {
        setOpen(true);
    };
    const handleAddCard = (value: string) => {
        setTypePayment(value);
    }

    const handleGetDataInput = (typeName: string, value: string) => {
        setFormErrors(prev => ({ ...prev, [typeName]: "" }));
        // setErrorCard("");
        // setErrorInfor("");
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
            case "nameCard":
                setNameCard(value);
                break;
            case "numberCard":
                setNumberCard(value);
                break;
            case "dateCard":
                setDateCard(value);
                break;
            case "cvvCard":
                setCvvCard(value);
                break;
            default:
                return;
        }
    }

    const handlePlaceOrder = () => {
        if (!phone && !fullName && !street && !ward && !district && !city) {
            setFormErrors(prev => ({
                ...prev,
                phone: "Please enter a valid phone",
                fullName: "Please enter a valid full name",
                city: "Please enter a valid city",
                district: "Please enter a valid district",
                ward: "Please enter a valid ward",
                street: "Please enter a valid street"
            }));
            inforRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        } else if (!phone) {
            setFormErrors(prev => ({ ...prev, phone: "Please enter a valid phone" }));
            inforRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        } else if (!fullName) {
            setFormErrors(prev => ({ ...prev, fullName: "Please enter a valid full name" }));
            inforRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        } else if (!city) {
            setFormErrors(prev => ({ ...prev, city: "Please enter a valid city" }));
            inforRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        } else if (!district) {
            setFormErrors(prev => ({ ...prev, district: "Please enter a valid district" }));
            inforRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        } else if (!ward) {
            setFormErrors(prev => ({ ...prev, ward: "Please enter a valid ward" }));
            inforRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        } else if (!street) {
            setFormErrors(prev => ({ ...prev, street: "Please enter a valid street" }));
            inforRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }

        if (typePayment === "credit") {
            if (!nameCard && !numberCard && !dateCard && !cvvCard) {
                setFormErrors(prev => ({
                    ...prev,
                    nameCard: "Please enter a valid name card",
                    numberCard: "Please enter a number card",
                    dateCard: "Please enter a date card",
                    cvvCard: "Please enter a cvv card"
                })); cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
            } else if (!nameCard) {
                setFormErrors(prev => ({ ...prev, nameCard: "Please enter a valid name card" }));
                inforRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
            } else if (!numberCard) {
                setFormErrors(prev => ({ ...prev, numberCard: "Please enter a number card" }));
                inforRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
            } else if (!dateCard) {
                setFormErrors(prev => ({ ...prev, dateCard: "Please enter a date card" }));
                inforRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
            }
            else if (!cvvCard) {
                setFormErrors(prev => ({ ...prev, cvvCard: "Please enter a cvv card" }));
                inforRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
            }
        }


        toast.success('Order thành công!');
    }

    const handleBlur = (typeName: string, value: string) => {
        if (!value.trim()) return;

        if (typeName === "email" && !emailRegex.test(value)) {
            setFormErrors(prev => ({ ...prev, email: "Please enter a valid email" }));
        }

        if (typeName === "phone" && !phoneRegex.test(value)) {
            setFormErrors(prev => ({ ...prev, phone: "Please enter a valid phone" }));
        }
        if (typeName === "fullName" && !value) {
            setFormErrors(prev => ({ ...prev, fullName: "Please enter a valid Full Name" }));
        }

        if (typeName === "street" && !value) {
            setFormErrors(prev => ({ ...prev, street: "Please enter a valid street" }));
        }
        if (typeName === "ward" && !value) {
            setFormErrors(prev => ({ ...prev, ward: "Please enter a valid ward" }));
        }

        if (typeName === "district" && !value) {
            setFormErrors(prev => ({ ...prev, district: "Please enter a valid district" }));
        }
        if (typeName === "city" && !value) {
            setFormErrors(prev => ({ ...prev, city: "Please enter a valid city" }));
        }

        if (typeName === "nameCard" && !value) {
            setFormErrors(prev => ({ ...prev, nameCard: "Please enter a valid name card" }));
        }
        if (typeName === "numberCard" && !value) {
            setFormErrors(prev => ({ ...prev, numberCard: "Please enter a valid number card" }));
        }

        if (typeName === "dateCard" && !value) {
            setFormErrors(prev => ({ ...prev, dateCard: "Please enter a valid date card" }));
        }
        if (typeName === "cvvCard" && !value) {
            setFormErrors(prev => ({ ...prev, cvvCard: "Please enter a valid cvv card" }));
        }
    };

    return (
        <div className="w-full h-max mt-[120px] mb-[100px] px-[var(--padding-screen)] flex">
            <div className="">
                <div className="border-b border-[#E5E5E5] pb-[40px]">
                    <h2 ref={inforRef} className="font-[600] text-[20px] mb-[40px]">DELIVERY</h2>
                    <div className="w-full flex justify-between">
                        <div className="w-[46%]">
                            <InputField star={false} valueDefault={email ? email : emailUser} title="Email" type="email" name="email" onSave={(typeName, value) => handleGetDataInput(typeName, value)} onGetBlur={(typeName, value) => handleBlur(typeName, value)} />
                            <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
                                {formErrors.email || "\u00A0"}
                            </p>
                        </div>
                        <div className="w-[46%] ml-[20px]">
                            <InputField valueDefault={phone ? phone : phoneUser} title="Phone Number" type="string" name="phone" onSave={(typeName, value) => handleGetDataInput(typeName, value)} onGetBlur={(typeName, value) => handleBlur(typeName, value)} />
                            <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
                                {formErrors.phone || "\u00A0"}
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="w-[46%]">
                            <InputField valueDefault={fullName ? fullName : fullNameUser} title="Full Name" type="string" name="fullName" onSave={(typeName, value) => handleGetDataInput(typeName, value)} onGetBlur={(typeName, value) => handleBlur(typeName, value)} />
                            <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
                                {formErrors.fullName || "\u00A0"}
                            </p>
                        </div>
                        <div className="w-[46%] ml-[20px]">
                            <InputField valueDefault={city} title="City" type="string" name="city" onSave={(typeName, value) => handleGetDataInput(typeName, value)} onGetBlur={(typeName, value) => handleBlur(typeName, value)} />
                            <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
                                {formErrors.city || "\u00A0"}
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="w-[46%]">
                            <InputField valueDefault={district} title="District" type="string" name="district" onSave={(typeName, value) => handleGetDataInput(typeName, value)} onGetBlur={(typeName, value) => handleBlur(typeName, value)} />
                            <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
                                {formErrors.district || "\u00A0"}
                            </p>
                        </div>
                        <div className="w-[46%] ml-[20px]">
                            <InputField valueDefault={ward} title="Ward" type="string" name="ward" onSave={(typeName, value) => handleGetDataInput(typeName, value)} onGetBlur={(typeName, value) => handleBlur(typeName, value)} />
                            <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
                                {formErrors.ward || "\u00A0"}
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="w-[46%]">
                            <InputField valueDefault={street} title="Street" type="string" name="street" onSave={(typeName, value) => handleGetDataInput(typeName, value)} onGetBlur={(typeName, value) => handleBlur(typeName, value)} />
                            <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
                                {formErrors.street || "\u00A0"}
                            </p>
                        </div>
                    </div>
                    {/* <p className="text-[red] text-[12px]">{errorInfor}</p> */}
                </div>
                <div className="border-b border-[#E5E5E5] mt-[20px] pb-[40px]">
                    <h2 className="font-[600] text-[20px] mb-[40px]">SHIPPING</h2>
                    <p className="text-[636364]">10$ Shipping</p>
                    <p className="my-[10px] text-[636364]">Shipment One</p>
                    <p className="text-[636364]">Arrives Fri, Aug 1 - Sun, Aug 3</p>
                </div>
                <div className="mt-[20px] pb-[40px]">
                    <h2 className="font-[600] text-[20px] mb-[40px]">PAYMENT</h2>
                    <div>
                        <p className="text-[#636364] mb-[10px] font-[600]">Have a promo code?</p>
                        <div className="w-[60%] flex items-center h-[36px] gap-x-[20px]">
                            <InputField isError={false} star={false} title="" valueDefault={promoCode ? promoCode : ""} onSave={(typeName, value) => handleGetDataInput(typeName, value)} name="promo_code" type="string" placeholder="Promo" onGetBlur={(typeName, value) => handleBlur(typeName, value)} />
                            <Button title="ADD" onSubmit={handleGetPromoCode} width="w-[120px]" height="h-full" margin="mt-[8px]" boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" />
                        </div>
                        <p className={`text-[12px] ml-[4px] mt-[8px] ${promoCode ? "text-[#13B253]" : "text-[#636364]"}`}>{promoCode ? "Promo code applied successfully" : "Limit 1 promo per order"}</p>
                    </div>
                    <div className="mt-[40px]">
                        <p ref={cardRef} className="text-[#636364] mb-[20px] font-[600]">How would you like to pay?</p>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div
                                    onClick={() => handleAddCard("credit")}
                                    className={`hover:scale-101 cursor-pointer p-[2px] rounded-[16px] min-w-[200px] min-h-[40px] ${typePayment === "credit"
                                        ? "bg-gradient-to-r from-purple-500 via-pink-500 to-pink-400"
                                        : "border border-[#A5A5A5]"
                                        }`}
                                >
                                    <div className="w-full h-full flex items-center justify-center px-[16px] py-[8px] bg-white rounded-[14px]">
                                        <MdCreditCard size={16} />
                                        <span className="ml-[10px] text-[#181818] text-[14px] font-[600]">Credit or Debit Card</span>
                                    </div>
                                </div>
                                <div
                                    onClick={() => handleAddCard("paypal")}
                                    className={`hover:scale-101 cursor-pointer p-[2px] rounded-[16px] ml-[20px] min-w-[200px] min-h-[40px] ${typePayment === "paypal"
                                        ? "bg-gradient-to-r from-purple-500 via-pink-500 to-pink-400"
                                        : "border border-[#A5A5A5]"
                                        }`}
                                >
                                    <div className="w-full h-full flex items-center justify-center px-[16px] py-[8px] bg-white rounded-[14px]">
                                        <Image src={paypal} width={60} height={30} alt="paypal" />
                                    </div>
                                </div>
                                <div
                                    onClick={() => handleAddCard("gpay")}
                                    className={`hover:scale-101 cursor-pointer p-[2px] rounded-[16px] ml-[20px] min-w-[200px] min-h-[40px] ${typePayment === "gpay"
                                        ? "bg-gradient-to-r from-purple-500 via-pink-500 to-pink-400"
                                        : "border border-[#A5A5A5]"
                                        }`}
                                >
                                    <div className="w-full h-full flex items-center justify-center px-[16px] py-[8px] bg-white rounded-[14px]">
                                        <Image src={google} width={12} height={12} alt="google" />
                                        <span className="text-[#3C4043] font-[600] text-[14px] ml-[4px]">Pay</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    {typePayment === "credit" && <div className="mt-[40px]">
                        <p className="text-[#636364] mb-[10px] font-[600]">Enter your payment details</p>
                        <div className="w-full flex justify-between">
                            <div className="w-[46%]">
                                <InputField placeholder="Name on card" star={false} title="" type="string" name="nameCard" onSave={(typeName, value) => handleGetDataInput(typeName, value)} onGetBlur={(typeName, value) => handleBlur(typeName, value)} />
                                <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
                                    {formErrors.nameCard || "\u00A0"}
                                </p>
                            </div>
                            <div className="w-[46%] ml-[20px]">
                                <InputField placeholder="Card number" star={false} title="" type="string" name="numberCard" onSave={(typeName, value) => handleGetDataInput(typeName, value)} onGetBlur={(typeName, value) => handleBlur(typeName, value)} />
                                <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
                                    {formErrors.numberCard || "\u00A0"}
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex justify-between">
                            <div className="w-[46%]">
                                <InputField placeholder="MM/YY" star={false} title="" type="string" name="dateCard" onSave={(typeName, value) => handleGetDataInput(typeName, value)} onGetBlur={(typeName, value) => handleBlur(typeName, value)} />
                                <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
                                    {formErrors.dateCard || "\u00A0"}
                                </p>
                            </div>
                            <div className="w-[46%] ml-[20px]">
                                <InputField placeholder="CVV" star={false} title="" type="string" name="cvvCard" onSave={(typeName, value) => handleGetDataInput(typeName, value)} onGetBlur={(typeName, value) => handleBlur(typeName, value)} />
                                <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
                                    {formErrors.cvvCard || "\u00A0"}
                                </p>
                            </div>
                        </div>
                        {/* <p className="text-[red] text-[12px]">{errorCard}</p> */}
                    </div>}
                    <div className="mt-[40px]">
                        <p className="text-[12px] mb-[10px]">By clicking Place Order, your agree the ESW Terms and Conditions.</p>
                        <Button title="PLACE ORDER" onSubmit={handlePlaceOrder} width="w-[160px]" boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" />
                    </div>
                </div>
            </div>
            <div className="w-[30%] ml-[40px]">
                <h2 className="font-[600] text-[20px] mb-[40px]">ORDER SUMMARY</h2>
                <div className="my-[40px]">
                    <div className="flex justify-between">
                        <p className="font-bold">Subtotal</p>
                        <p>${total}</p>
                    </div>
                    <div className="text-[#ABABAB] flex flex-row justify-between py-[10px]">
                        <p>Delivery/Shipping</p>
                        <p>$10</p>
                    </div>
                    <div className="flex flex-row justify-between py-[10px] border-b border-[#E5E5E5]">
                        <div className="flex items-center">
                            <Image src={mdi_voucher} width={20} height={20} alt="voucher" />
                            <p className="ml-[10px] font-[600]">{promoCodeName}</p>
                        </div>
                        <p>{promoCodeValue}</p>
                    </div>
                    <div className="flex py-[20px] justify-between border-b border-[#E5E5E5]">
                        <p className="font-[600]">Total</p>
                        <p>${totalDiscount}</p>
                    </div>
                </div>
                <div className="flex flex-col">
                    {listProduct.length > 0 && (
                        listProduct.map(item =>
                            <div key={`${item.id}-${item.name}`} className="w-full flex mt-[20px] items-start justify-start">
                                <div className="bg-[#D9D9D9] w-[160px] max-w-[160px] h-[200px] relative">
                                    <Image src={item.image_url || item_img} fill className="object-contain" alt="product" />
                                </div>
                                <div className="ml-[20px]">
                                    <p className="uppercase font-[600]">{item.name}</p>
                                    <p className="capitalize my-[10px]"><span>Category: </span><span>{item.category}</span></p>
                                    <p className="flex items-center"><span>Color:</span>
                                        <span style={{ backgroundColor: item.color }}
                                            className={`w-[20px] h-[20px] ml-[10px] inline-block`}>
                                        </span>
                                    </p>
                                    <p className="my-[10px]">Size: <span className="underline">{item.size}</span></p>
                                    <p className="font-[16px]">Quantity: <span>{item.quantity}</span></p>
                                    <p className="text-[16px] font-[600] mt-[10px]">${item.price}</p>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
            <Toaster position="bottom-right" />
            <PromoCodePopup open={open} onClose={handleClosePopup} />
        </div>)
}