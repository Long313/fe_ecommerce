import Image from "next/image";

interface ProductNoPriceProps {
    image: string,
    description: string,
    width?: number | string,
    height?: number | string
    name?: string,
}

function ProductNoPrice(props: ProductNoPriceProps) {
    const { image, name, description } = props;
    return (
        <div className={`hover:scale-101 transition-transform duration-300 cursor-pointer w-full`}>
            <div className="bg-[#F8F8F8] rounded-[4px] w-full overflow-hidden aspect-[477/628]">
                <Image src={image} alt="product" className="w-full h-full object-cover" />
            </div>
            <div className="h-[120px] flex flex-col justify-center items-center text-center px-4 mt-4">
                <p className="font-semibold text-lg mb-2">{name}</p>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );
}



export default ProductNoPrice;