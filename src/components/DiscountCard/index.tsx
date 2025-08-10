import logo from "@/images/logo.svg";
import { useStore } from "@/store/store";
import Image from "next/image";

type DiscountCardProps = {
    name: string;
    value: string;
    onClosePopup: () => void;
}
export default function DiscountCard(props: DiscountCardProps) {
    const { name, value, onClosePopup } = props;
    const { setPromoCodeName, setPromoCodeValue } = useStore();
    const handleGetCode = () => {
        setPromoCodeValue(value);
        setPromoCodeName(name);
        onClosePopup();
    }
    return (
        <div className="flex h-max w-[400px] rounded-[20px] overflow-hidden shadow-[5px_7px_7px_0px_#00000040]">
            {/* Left label */}
            <div
                className="relative text-[20px] leading-[20px] tracking-wider flex items-center justify-center bg-[#822FFF] text-white px-4 w-[20%] rounded-r-[20px] rotate-180"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
                DISCOUNT

                {/* Nửa hình tròn khuyết để giả hiệu ứng cắt */}
                <div className="absolute -right-[20px] top-1/2 transform -translate-y-1/2 w-[40px] h-[40px] rounded-full bg-white"></div>
            </div>

            {/* Nội dung bên phải */}
            <div className="flex flex-col justify-between bg-white rounded-r-[20px] p-[16px] flex-1">
                <div>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm font-semibold">{value}</p>
                            <h2 className="text-lg font-bold my-[8px] uppercase">{name}</h2>
                        </div>
                        <div>
                            <Image
                                src={logo}
                                alt="logo"
                                width={30}
                                height={30}
                                className="object-contain border border-[#ECE7F8] rounded-full p-[2px]"
                            />
                        </div>
                    </div>
                    <p className="text-xs text-gray-400">Valid until 08 August 2025</p>
                    <a
                        href="#"
                        className="my-[10px] font-[600] no-underline text-xs text-purple-600 mt-1 inline-block hover:opacity-70"
                    >
                        *Terms & conditions
                    </a>
                </div>
                <button onClick={handleGetCode} className="cursor-pointer w-full border border-gray-300 rounded-full py-2 text-sm font-medium hover:bg-gray-100">
                    Apply Code
                </button>
            </div>
        </div>
    );
}
