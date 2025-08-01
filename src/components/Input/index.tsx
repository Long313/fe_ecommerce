import { InputProps } from "@/common/type";
import { useEffect, useState } from "react";

export default function Input(props: InputProps) {
    const {
        onGetData,
        title,
        name,
        type,
        width,
        height,
        placeholder,
        defaultValue,
        dataSelect = [],
    } = props;

    const [value, setValue] = useState<string>("");

    const handleGetValue = () => {
        onGetData(name, value);
    };

    useEffect(() => {
        if (defaultValue) setValue(defaultValue);
    }, [defaultValue]);
    const check = name === "city" || name === "district" || name === "ward";
    
    return (
        <div className="flex w-full h-full mt-[30px]">
            <p className="text-black font-[600] min-w-[100px]">
                {title}:<span className="text-[red]">&nbsp;*</span>
            </p>

            {!check ? (
                <input
                    onBlur={handleGetValue}
                    className={`cursor-pointer outline-none flex-1 ml-[20px] border border-[#822FFF] bg-[rgb(255,53,196,0.06)] rounded-[4px] py-[4px] px-[8px] text-black ${width ? width : "w-full"
                        } ${height ? height : "h-[30px]"}`}
                    value={value}
                    placeholder={placeholder}
                    type={type}
                    name={name}
                    onChange={(e) => setValue(e.target.value)}
                />
            ) : (
                <select
                    value={value}
                    // onChange={(e) => setValue(e.target.value)}
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        setValue(selectedValue);

                        const selectedItem = dataSelect.find((item) => item.value === selectedValue);
                        if (selectedItem) {
                            // Gửi toàn bộ object nếu muốn
                            onGetData(name, selectedItem.value, selectedItem.id); // hoặc selectedItem
                        }
                    }}
                    // onBlur={handleGetValue}
                    className={`cursor-pointer appearance-none bg-[url("data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjODIyRkZGIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBkPSJNNSA3bDUgNSA1LTVINXoiLz48L3N2Zz4=")] bg-no-repeat bg-[right_8px_center] pr-[32px] outline-none flex-1 ml-[20px] !border !border-solid !border-[#822FFF] bg-[rgb(255,53,196,0.06)] rounded-[4px] py-[4px] px-[8px] text-black ${width ? width : "w-full"
                        } ${height ? height : "h-[30px]"}`}
                >
                    {dataSelect.map((item) => (
                        <option key={item.id ?? item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}
