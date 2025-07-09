import useTranslation from "@/hooks/useTranslation";
import { resendOtp, verifyOtpRegister } from "@/service/register";
import { useStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useRef, useState } from 'react';
import Button from "../Button/page";
import CountdownTimer from "../CountDown/page";
import { useRouter } from "next/navigation";

function Modal() {
    const otpLength = 4;
    const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(""));
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [resetTime, setResetTime] = useState<boolean>(false)
    const { t, locale } = useTranslation();
    const router = useRouter();
    const emailAuthen = useStore((state) => state.emailAuthen);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otpLength - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").trim();
        if (!/^\d+$/.test(pasteData)) return;

        const pasteArray = pasteData.slice(0, otpLength).split("");
        const newOtp = [...otp];
        pasteArray.forEach((digit, idx) => {
            newOtp[idx] = digit;
            if (inputRefs.current[idx]) {
                inputRefs.current[idx]!.value = digit;
            }
        });
        setOtp(newOtp);

        const nextIndex = pasteArray.length < otpLength ? pasteArray.length : otpLength - 1;
        inputRefs.current[nextIndex]?.focus();
    };


    const handleResendOtp = () => {
        setResetTime(!resetTime);
        mutate({ email: emailAuthen, purpose: "register" });
    }

    const {
        mutate,
        isPending, // làm loading
        isError: mutationError,
        isSuccess,
        error,
    } = useMutation({
        mutationFn: resendOtp,
        onSuccess: (res) => {
            if (res.status === 200) {
                console.log("res", res);
            }
        },
        onError: (error: any) => {
            console.log(error.message || "Có lỗi xảy ra");
        }

    });

    const handleCloseModal = () => {
    }

    const handleVerifyOtp = () => {
        const codeOtp = otp.join("");
        console.log("codeOpt", codeOtp);
        console.log("emailAuthen", emailAuthen);
        mutateVerifyOtp({ email: emailAuthen, otp: codeOtp });
    }

    const {
        mutate: mutateVerifyOtp,
        isPending : isPendingVerifyOtp, // làm loading
        isError: mutationErrorVerifyOtp,
        isSuccess: isSuccessc,
        error : errorVerifyOtp,
    } = useMutation({
        mutationFn: verifyOtpRegister,
        onSuccess: (res) => {
            if (res.status === 200) {
                router.push(`/${locale}/login`);
            }
        },
        onError: (error: any) => {
            console.log(error.message || "Có lỗi xảy ra");
        }

    });

    return (<div className="p-[8px] rounded-[16px] fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30%] max-w-[896px] max-h-[606px] bg-white">
        <div className="flex justify-between"><p className="text-[#751872]">{t("registerTitle")}</p><X color="#9135FA" className="cursor-pointer" onClick={handleCloseModal} /></div>
        <div className="flex flex-col items-center mt-[10px]">
            <p className="text-[24px] text-[#9D9D9D] text-center">{t("sendOtpTitle")}</p>
            <p className="text-[#CE00C5] text-[24px]">{t("enterOtp")}</p>
            <CountdownTimer callBack={resetTime} />
        </div>
        <div className="mx-auto flex justify-between w-[70%] mt-[40px]">
            {otp.map((digit, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1}
                    defaultValue={digit}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    className="text-[20px] outline-none inline-block border-b-[3px] border-[#651666] w-[18%] text-center"
                />
            ))}


        </div>
        <div className="my-[30px] flex justify-between w-[70%] mx-auto">
            <div onClick={handleResendOtp} className="cursor-pointer inline-block rounded-[4px] p-[2px] bg-gradient-to-r from-[#9930F4] to-[#FC35C5]">
                <button className="hover:zoom transition-transform duration-300 transform hover:scale-101 cursor-pointer rounded-[4px] bg-white text-[#5B005C] font-semibold px-[12px] py-[4px] w-[120px]">
                    {t("resendOtp")}
                </button>
            </div>
            <Button title={t("verifyOtp")} width="w-[120px]" height="h-[34px]" rounded="rounded-[4px]" onSubmit={handleVerifyOtp} boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" />

        </div>
    </div>);
}

export default Modal;