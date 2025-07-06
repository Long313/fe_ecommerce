import { X } from "lucide-react";
import InputField from "../InputFeild/page";
import useTranslation from "@/hooks/useTranslation";
import Button from "../Button/page";
import CountdownTimer from "../CountDown/page";

function Modal() {
    const { t, locale } = useTranslation();
    
    const handleVerifyOtp = () => {

    }

    const handleResendOtp = () => {

    }

    const handleCloseModal = () => {

    }
    
    return (<div className="p-[8px] rounded-[16px] fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30%] max-w-[896px] max-h-[606px] bg-white">
        <div className="flex justify-between"><p className="text-[#751872]">SIGN UP</p><X color="#9135FA" className="cursor-pointer" onClick={handleCloseModal}/></div>
        <div className="flex flex-col items-center mt-[10px]">
            <p className="text-[24px] text-[#9D9D9D]">We have sent an OTP to your mail.</p>
            <p className="text-[#CE00C5] text-[24px]">Please enter OTP</p>
            <CountdownTimer/>
        </div>
        <div className="mx-auto flex justify-between w-[70%] mt-[40px]">
            <span className="inline-block border-b-[3px] border-[#651666] w-[18%] text-center">a</span>
            <span className="inline-block border-b-[3px] border-[#651666] w-[18%] text-center">a</span>
            <span className="inline-block border-b-[3px] border-[#651666] w-[18%] text-center">a</span>
            <span className="inline-block border-b-[3px] border-[#651666] w-[18%] text-center">a</span>

        </div>
        <div className="my-[30px] flex justify-between w-[70%] mx-auto">
            <div onClick={handleResendOtp} className="cursor-pointer inline-block rounded-[4px] p-[2px] bg-gradient-to-r from-[#9930F4] to-[#FC35C5]">
                <button className="hover:zoom transition-transform duration-300 transform hover:scale-101 cursor-pointer rounded-[4px] bg-white text-[#5B005C] font-semibold px-[12px] py-[4px] w-[120px]">
                    {t("Resend OTP")}
                </button>
            </div>
            <Button title={t("verifyOtp")} width="w-[120px]" height="h-[34px]" rounded="rounded-[4px]" onSubmit={handleVerifyOtp} boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]"/>

        </div>
    </div>);
}

export default Modal;