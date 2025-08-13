'use client'
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

type PhoneWrapperProps = {
    onSave: (name: string, value: string) => void,
    onGetBlur: (name: string, value: string) => void,
    getError?: Record<string, string>
}

export default function PhoneWrapper(props: PhoneWrapperProps) {
    const { onSave, onGetBlur } = props;
    // const { t } = useTranslation();

    const [phone, setPhone] = useState<string>("");
    // const [phoneError, setPhoneError] = useState<string | boolean>("");
    // const phoneRegex = /^\+?[0-9]{8,15}$/;
    // const handlePhoneError = () => {
    //     if (!phoneRegex.test(phone)) {
    //         setPhoneError(t("phoneError"));
    //     } else {
    //         setPhoneError("");
    //         onSave("phone", phone);
    //     }
    // };

    const handleGetPhone = (phone: string) => {
        // setPhoneError("");
        setPhone(phone);
        onSave("phone", phone);
    }

    const handleBlur = (phone: string) => {
        onGetBlur("phone", phone);
    }

    return (<div className="flex flex-col w-full">
        <label className="inline-block font-[500]">Phone<span className='text-[red]'>*</span></label>
        <PhoneInput
            country={'vn'}
            value={phone}
            onChange={phone => handleGetPhone(phone)}
            onBlur={() => handleBlur(phone)}
            containerClass="!flex !rounded-[8px] !w-full"
            inputClass="!flex-1 !rounded-[8px] !text-[16px] text-[#636364]"
        // dropdownClass="!z-50"
        // buttonClass="!bg-[#f1f1f1] !hover:bg-[#f1f1f1]"
        />
        {/* <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[24px] visibility-visible">
            {phoneError || "\u00A0"}
        </p> */}
    </div>);
}
