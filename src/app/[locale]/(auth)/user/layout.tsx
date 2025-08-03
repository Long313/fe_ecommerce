import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

export default function LayoutUser({ children }: { children: ReactNode }) {
    return (
        <div className="w-full h-full mt-[120px] mb-[100px] px-[var(--padding-screen)] flex">
            <Sidebar />
            <div className="ml-[40px] flex-1">
                {children}
            </div>
        </div>
    )
}