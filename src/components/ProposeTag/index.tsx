'use client'
type ProposeTag = {
    name: string,
    onChoose: (arg: string) => void
}
export default function ProposeTag(props: ProposeTag) {
    const { onChoose, name } = props;
    return (<div
        onClick={() => onChoose(name)}
        className="cursor-pointer border border-[#373737] rounded-[16px] mr-[40px] py-[8px] px-[16px] flex items-center shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
    >
        <span
            title={name}
            className="max-w-[100px] overflow-hidden whitespace-nowrap text-ellipsis block text-[#373737]"
        >
            {name}
        </span>
    </div>)
}