import { InputProps } from "@/common/type";
import { useState } from "react";

export default function Input(props: InputProps) {
    const { onGetData, title, name, type, width, height, placeholder } = props;
    const [value, setValue] = useState<string | number>("");
    const handleGetValue = () => {
        onGetData(name, value);
    }
    return (
        <div className="flex w-full h-full mt-[30px]">
            <p className="text-black font-[600] min-w-[100px]">{title}:<span className="text-[red]">&nbsp;*</span></p>
            <input onBlur={handleGetValue} className={`outline-none flex-1 ml-[20px] border border-[#822FFF] bg-[rgb(255,53,196,0.06)] rounded-[4px] py-[4px] px-[8px] text-black ${width ? width : "w-full"} ${height ? height : "h-[30px]"}`} value={value} placeholder={placeholder} type={type} name={name} onChange={(e) => setValue(e.target.value)} />
        </div>
    )
}