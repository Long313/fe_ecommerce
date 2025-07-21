'use client'
type ProposeTag = {
    name: string,
    onChoose: (arg: string) => void
}
export default function ProposeTag(props: ProposeTag) {
    const { onChoose, name } = props;
    return (<div onClick={() => onChoose(name)} className="whitespace-nowrap cursor-pointer text-[#373737] border border-[#373737] w-fit rounded-[16px] mr-[40px] py-[8px] px-[16px] flex items-center shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)] hover:scale-[1.01]"
    >
        {name}
    </div>)
}