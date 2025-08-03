import useTranslation from "@/hooks/useTranslation";
import { verifyOtpReset } from "@/service/forgot-password";
import { resendOtp } from "@/service/otp";
import { verifyOtpRegister } from "@/service/register";
import { useStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef, useState } from 'react';
import Button from "../Button";
import CountdownTimer from "../CountDown";
import Loader from "../Loader";

function Modal() {
    const otpLength = 4;
    const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(""));
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [resetTime, setResetTime] = useState<boolean>(false)
    const { t, locale } = useTranslation();
    const router = useRouter();
    const emailAuthen = useStore((state) => state.emailAuthen);
    const typeOtpAuthen = useStore((state) => state.typeOtpAuthen);
    const [error, setError] = useState<string>("");
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
        if (typeOtpAuthen === "reset") {
            mutate({ email: emailAuthen, purpose: "reset" });
        } else {
            mutate({ email: emailAuthen, purpose: "register" });
        }
    }

    // const {
    //     mutate: mutateReset,
    //     isPending: isPendingReset, // làm loading
    //     isError: mutationErrorReset,
    //     isSuccess: isSuccessReset,
    //     error: errorReset,
    // } = useMutation({
    //     mutationFn: resendOtp,
    //     onSuccess: (res) => {
    //         if (res.status === 200) {
    //             console.log("res", res);
    //         }
    //     },
    //     onError: (error: any) => {
    //         console.log(error.message || "Có lỗi xảy ra");
    //     }

    // });

    const {
        mutate,
        // isPending
        // isError: mutationError,
        // isSuccess,
        // error,
    } = useMutation({
        mutationFn: resendOtp,
        onSuccess: (res) => {
            if (res.status === 200) {
                console.log("res", res);
            }
        },
        onError: (error) => {
            console.log(error.message || "Có lỗi xảy ra");
        }

    });

    const handleVerifyOtp = () => {
        const codeOtp = otp.join("");
        if (typeOtpAuthen === "reset") {
            mutateVerifyOtpReset({ email: emailAuthen, otp: codeOtp });
        } else {
            mutateVerifyOtp({ email: emailAuthen, otp: codeOtp });
        }
    }

    const {
        mutate: mutateVerifyOtp,
        isPending
        // isError: mutationErrorVerifyOtp,
        // isSuccess: isSuccessVerifyOtp,
        // error: errorVerifyOtp,
    } = useMutation({
        mutationFn: verifyOtpRegister,
        onSuccess: (res) => {
            if (res.status === 200) {
                router.push(`/${locale}/success`);
            } else {
                setError("OTP code not valid")
            }
        },
        onError: (error) => {
            console.log(error.message || "Có lỗi xảy ra");
            setError("OTP code not valid")
        }

    });

    const {
        mutate: mutateVerifyOtpReset,
        // isPending: isPendingVerifyOtpReset
        // isError: mutationErrorVerifyOtpReset,
        // isSuccess: isSuccessVerifyOtpReset,
        // error: errorVerifyOtpReset,
    } = useMutation({
        mutationFn: verifyOtpReset,
        onSuccess: (res) => {
            if (res.status === 200) {
                router.push(`/${locale}/reset-password`);
                router.refresh();
            }
        },
        onError: (error) => {
            console.log(error.message || "Có lỗi xảy ra");
        }

    });

    return (<div className="max-w-[520px]">
        {isPending && (
            <Loader />
        )}
        <div className="mt-[20px] text-center bg-gradient-to-r from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent text-[40px] font-[700]">{t("checkMailTitle")}</div>
        <div className="flex flex-col items-center mt-[10px]">
            <p className="text-[16px] text-[#636364] text-center">{t("sendOtpTitle")}</p>
            <CountdownTimer callBack={resetTime} />
        </div>
        <div className="mx-auto flex justify-between w-[68%] mt-[40px]">
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
                    className="text-[36px] font-[600] outline-none inline-block border-b-[2px] border-[#822FFF] w-[18%] text-center"
                />
            ))}
        </div>
        <p className="mt-[20px] w-[68%] mx-auto text-center text-[14px] text-[red] font-[600]">{error ? error : "\u00A0"}</p>
        <div className="flex-col my-[30px] mx-auto flex justify-center items-center">
            <Button title={t("verifyOtp")} width="w-[70%]" height="h-[50px]" rounded="rounded-[12px]" onSubmit={handleVerifyOtp} boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" />
            <p className="text-[14px] mt-[20px] text-[#B9B9B9]">Didn’t you receive the OTP? <span onClick={handleResendOtp} className="cursor-pointer text-[#822FFF]">Resend OTP</span></p>
        </div>
    </div>);
}

export default Modal;