"use client";


type ButtonProps = {
    title: string;
    width?: string;
    height?: string;
    onSubmit: () => void;
    isDisable?: boolean;
};

function ButtonWhite(props: ButtonProps) {
    const {
        title,
        width,
        height,
        onSubmit
    } = props;

    return (
        <button
            onClick={() => onSubmit()}
            className={`${width ? width : "w-[140px]"} ${height ? height : "h-[40px]"} cursor-pointer ml-[20px] bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent bg-white border border-[#C4C4C4] shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)] flex justify-center items-center rounded-[12px] hover:scale-101`}
        >
            {title}
        </button>
    );
}

export default ButtonWhite;
