import LanguageSwitcher from "@/components/LanguageSwitcher/page";
import { ReactNode } from "react";
function LayoutAuthen({ children }: { children: ReactNode }) {
    return (
        <div className="h-screen w-full overflow-hidden">
            <div className="z-20 fixed top-[10px] right-[40px] flex justify-center items-center text-left rounded-[12px] w-[120px] h-[34px] p-[2px]">
                <LanguageSwitcher />
            </div>
            {children}
        </div>);
}

export default LayoutAuthen;