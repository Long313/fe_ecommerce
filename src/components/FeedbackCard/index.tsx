import Image from 'next/image'
import double from '../../images/double.svg'
type FeedbackCardProps = {
    name: string,
    description: string,
}
export default function FeedbackCard(props: FeedbackCardProps) {
    const { name, description } = props;
    return (<div className='flex flex-col justify-start p-[10px] hover:bg-[#D9D9D9] rounded-[4px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] w-[30%]'>
        <Image src={double} alt="double" width={20} height={20} />
        <p className="font-[600] text-[20px] my-[20px]">{name}</p>
        <p className="font-[600]">{description}</p>
    </div>)
}