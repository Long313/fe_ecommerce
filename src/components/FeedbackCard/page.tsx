import Image from 'next/image'
import double from '../../images/double.svg'

export default function FeedbackCard() {
    return (<div className='flex flex-col justify-start p-[10px] hover:bg-[#D9D9D9] rounded-[4px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] w-[30%]'>
        <Image src={double} alt="double" width={20} height={20} />
        <p className="font-[600] text-[20px] my-[20px]">Emily Wilson</p>
        <p className="font-[600]">The customer experience was exceptional from start to finish. The website is user-friendly, the checkout process was smooth, and the clothes I ordered fit perfectly. I'm beyond satisfied!</p>
    </div>)
}