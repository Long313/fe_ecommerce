type ButtonProps = {
    title: string,
    backgroundColor?: string,
    width?: string,
    height?: string,
    color?: string,
    onSubmit: () => void
}

function Button({title, backgroundColor, width, height, color, onSubmit} : ButtonProps) {

    return ( <button onClick={() => onSubmit()} className={`${backgroundColor ? backgroundColor : "bg-[#373737]"} ${width ? width : "min-w-[315px]"} ${height ? height: "h-[33px]"} ${color ? color : "text-[#fff]"} rounded-[12px] font-[500] text-[14px]`}>
        {title}
    </button> );
}

export default Button;