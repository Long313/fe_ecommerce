import Sidebar from "@/components/Sidebar/page";
import { ReactNode } from "react";

export default function LayoutUser({children} : {children: ReactNode}) {
    return (
        <div className="w-full h-full my-[200px] px-[var(--padding-screen)] flex">
                    <Sidebar />
                    <div className="ml-[40px] flex-1">
                        {children}
                    </div>
                </div>
    )
}