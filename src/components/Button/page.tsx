import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type ButtonProps = {
    title: string,
    backgroundColor?: string,
    width?: string,
    widthLogo?: string,
    height?: string,
    heightLogo?: string,
    color?: string,
    onSubmit: () => void,
    image?: string | StaticImport | undefined
}

function Button({ title, backgroundColor, width, height, color, onSubmit, image, widthLogo, heightLogo }: ButtonProps) {

    return (<button onClick={() => onSubmit()} className={`${backgroundColor ? backgroundColor : "bg-[#373737]"} ${width ? width : "min-w-[315px]"} ${height ? height : "h-[33px]"} ${color ? color : "text-[#fff]"} rounded-[12px] font-[500] text-[14px]`}>
        {image && <Image src={image} alt="logo-button" />}
        {title}
    </button>);
}

export default Button;