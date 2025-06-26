import LanguageSwitcher from "@/components/LanguageSwitcher/page";
import { ReactNode } from "react";
function LayoutRegister({ children }: { children: ReactNode }) {
    return (
        <div className="mt-[10px] mx-[20px] w-full h-full">
            <div className="ml-auto mr-[30px] flex justify-center items-center text-left border border-[#C4C4C4] rounded-[12px] w-[120px] h-[34px] p-[2px]">
                <LanguageSwitcher />
            </div>
            {children}
        </div>);
}

export default LayoutRegister;