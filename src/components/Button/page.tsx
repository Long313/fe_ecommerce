import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type ButtonProps = {
    title: string,
    backgroundColor?: string,
    width?: string,
    widthLogo?: number | undefined,
    height?: string,
    heightLogo?: number | undefined,
    color?: string,
    onSubmit: () => void,
    image?: string | StaticImport | undefined,
    border?: string,
    margin?: string,
    boxShadow?: string,
    rounded?: string,

}

function Button(props: ButtonProps) {
    const { title, backgroundColor, width, height, color, onSubmit, image, widthLogo, heightLogo, border, margin, boxShadow, rounded } = props;

    return (<button onClick={() => onSubmit()} className={`${backgroundColor ? backgroundColor : "bg-gradient-to-r from-[#822FFF] to-[#FF35C4]"} ${width ? width : "min-w-[315px]"} ${height ? height : "h-[40px]"} ${color ? color : "text-[#fff]"} ${border ? border : ""} ${boxShadow ? boxShadow : ""} ${margin ? margin : ""} ${rounded ? rounded : "rounded-[12px]"} 
    flex items-center justify-center font-[500] text-[14px] cursor-pointer hover:zoom transition-transform duration-300 transform hover:scale-101`}>
        {image && <Image src={image} alt="logo-button" width={widthLogo} height={heightLogo} className="inline-block" />}
        <span className="inline-block ml-[8px]">{title}</span>
    </button>);
}

export default Button;