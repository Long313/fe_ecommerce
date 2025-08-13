'use client'

import { IoCloseOutline } from "react-icons/io5";

type ProposeTag = {
    name: string,
    onChoose: (arg: string) => void
    onClear: (e: React.MouseEvent<HTMLDivElement>, name: string) => void
}
export default function ProposeTag(props: ProposeTag) {
    const { onChoose, name, onClear } = props;
    return (<div
        onClick={() => onChoose(name)}
        className="relative flex justify-center items-center min-w-[100px] cursor-pointer border border-[#373737] rounded-[16px] mr-[40px] py-[10px] px-[24px] shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
    >
        <div onClick={(e) => onClear(e, name)} className='rounded-full border border-[#E5E5E5] cursor-pointer absolute top-[3px] right-[3px] hover:scale-102 p-[1px]' >
            <IoCloseOutline size={16} />
        </div>
        <span
            title={name}
            className="max-w-[100px] text-center overflow-hidden whitespace-nowrap text-ellipsis block text-[#373737]"
        >
            {name}
        </span>
    </div>)
}