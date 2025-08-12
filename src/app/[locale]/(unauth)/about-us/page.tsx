'use client';

import about_1 from '@/images/about_1.svg';
import about_2 from '@/images/about_2.svg';
import about_3 from '@/images/about_3.svg';
import about_4 from '@/images/about_4.svg';
import about_5 from '@/images/about_5.svg';
import about_us from '@/images/about_us.svg';
import line_bot from '@/images/line_bot.svg';
import line_top from '@/images/line_top.svg';
import logo from '@/images/logo.svg';
import Image from 'next/image';
import about_6 from '../../../../images/about_6.svg';
import bar_1 from '../../../../images/bar_1.svg';
import bar_2 from '../../../../images/bar_2.svg';
import bar_3 from '../../../../images/bar_3.svg';
import line_1 from '../../../../images/line_1.svg';
import line_2 from '../../../../images/line_2.svg';
import line_3 from '../../../../images/line_3.svg';
import line_4 from '../../../../images/line_4.svg';
import line_5 from '../../../../images/line_5.svg';
import line_6 from '../../../../images/line_6.svg';
import { useRouter } from 'next/navigation';
import useTranslation from '@/hooks/useTranslation';
function AboutUs() {
    const router = useRouter();
    const { locale } = useTranslation();
    return (
        <div className="flex flex-col w-full h-screen overflow-auto">
            <div className="w-full mt-[60px]">
                <div className='w-[40%] h-[20px] relative ml-[40px]'>
                    <Image src={line_top} alt="line-top" fill className="object-contain" />
                </div>
                <div className='w-[30%] mx-auto my-[40px]'>
                    <div className='w-full h-[60px] relative cursor-pointer' onClick={() => router.push(`/${locale}/`)}>
                        <Image src={logo} alt="logo" fill className="object-contain" />
                    </div>
                    <p className='mb-[20px] text-[#373737] text-center text-[24px] mt-[2px] cursor-pointer' onClick={() => router.push(`/${locale}/`)}>AMAX</p>
                    <div className='w-full h-[60px] ml-auto relative' >
                        <Image src={about_us} alt="about-us" fill className="object-contain" />
                    </div>
                </div>
                <div className='w-[30%] h-[20px] relative ml-auto mr-[40px]'>
                    <Image src={line_bot} alt="line_bot" fill className="object-contain" />
                </div>
            </div>
            <div className='bg-[rgba(255,53,196,0.15)] flex justify-evenly w-full min-h-[400px] mt-[50px] mb-[100px]'>
                <div className='w-[calc(30/40*400px)] h-[calc(30/40*400px)] relative mt-[30px]'>
                    <Image src={about_1} alt="line_bot" fill className='object-contain' />
                </div>
                <div className='w-[calc(26/40*400px)] h-[calc(26/40*400px)] relative mt-[10px]'>
                    <Image src={about_2} alt="line_bot" fill className='object-contain' />
                </div>
                <div className='w-[calc(24/40*400px)] h-[calc(24/40*400px)] relative mb-[20px] mt-[calc(10/40*400px)]'>
                    <Image src={about_3} alt="line_bot" fill className='object-contain' />
                </div>
                <div className='w-[calc(20/30*400px)] h-[calc(34/40*400px)] relative mt-auto'>
                    <Image src={about_4} alt="line_bot" fill className='object-contain' />
                </div>
            </div>
            <div className='relative flex min-h-[400px]'>
                <div className='w-[45%]'>
                    <p className='ml-[60px] text-[#373737] text-[20px]'>AMAX</p>
                    <p className='uppercase ml-[60px] text-[30px] font-[700]'>The 5-Year Journey</p>
                    <div className="uppercase italic text-black pl-[70px] w-[80%] py-[6px] my-[8px] bg-[linear-gradient(to_right,rgba(130,47,255,0.5),rgba(255,53,196,0.5))]">
                        Push Harder. Go Further
                    </div>
                    <p className='pl-[60px] leading-relaxed' style={{ textAlign: 'justify' }}>Over the past five years, our sportswear brand has grown from a small idea into a beloved name within the active lifestyle community. Starting with simple yet refined designs, we’ve always prioritized quality, comfort, and style as our core values. Through challenges and change, each collection we’ve launched reflects our commitment to listening to our customers and continuously improving. From our very first orders to being present at major races and gyms nationwide, this five-year journey stands as a testament to our passion, perseverance, and dedication to inspiring a more active way of life.</p>
                </div>
                <div className="-bottom-[20%] right-[20%] absolute rounded-[2px] shadow-[5px_7px_7px_0px_#00000040] mx-auto bg-white w-[260px] h-[300px] rotate-[3.99deg]">
                    <div className="relative w-[240px] h-[240px] mx-auto mt-[20px] rounded-[2px]">
                        <Image src={about_5} alt="cover" fill className="object-contain w-full h-full rotate-[-3.99deg]" />
                    </div>
                    <div
                        className="absolute top-[20px] right-[-30px] w-[120px] h-[24px] rotate-[25deg] z-10 [background-color:rgba(130,47,255,0.59)]
                        [&::before]:content-[''] [&::before]:absolute [&::before]:h-[24px] [&::before]:w-[24px] [&::before]:border-x-[12px] [&::before]:border-y-[12px] [&::before]:border-y-[transparent] [&::before]:border-r-[transparent] [&::before]:border-[white] [&::before]:top-0 [&::before]:-left-[1px]
                        [&::after]:content-[''] [&::after]:absolute [&::after]:h-[24px] [&::after]:w-[24px] [&::after]:border-x-[12px] [&::after]:border-y-[12px] [&::after]:border-y-[transparent] [&::after]:border-l-[transparent] [&::after]:border-[white] [&::after]:top-0 [&::after]:-right-[1px]
                        "
                    >
                    </div>
                </div>
            </div>
            <div className='relative flex min-h-[300px] mt-[200px]'>
                <div className="-top-[10%] left-[10%] absolute rounded-[2px] shadow-[5px_7px_7px_0px_#00000040] mx-auto bg-white w-[260px] h-[300px] rotate-[-3.99deg]">
                    <div className="relative w-[240px] h-[240px] mx-auto mt-[20px] rounded-[2px]">
                        <Image src={about_6} alt="cover" fill className="object-contain w-full h-full rotate-[6.98deg]" />
                    </div>
                    <div
                        className="absolute top-[20px] left-[-30px] w-[120px] h-[24px] -rotate-[25deg] z-10 [background-color:rgba(130,47,255,0.59)]
                        [&::before]:content-[''] [&::before]:absolute [&::before]:h-[24px] [&::before]:w-[24px] [&::before]:border-x-[12px] [&::before]:border-y-[12px] [&::before]:border-y-[transparent] [&::before]:border-r-[transparent] [&::before]:border-[white] [&::before]:top-0 [&::before]:-left-[1px]
                        [&::after]:content-[''] [&::after]:absolute [&::after]:h-[24px] [&::after]:w-[24px] [&::after]:border-x-[12px] [&::after]:border-y-[12px] [&::after]:border-y-[transparent] [&::after]:border-l-[transparent] [&::after]:border-[white] [&::after]:top-0 [&::after]:-right-[1px]
                        "
                    >
                    </div>
                </div>
                <div className='w-[60%] ml-auto'>
                    <div className="ml-auto uppercase italic text-black w-[80%] py-[6px] pl-[60px] my-[8px] bg-[linear-gradient(to_right,rgba(130,47,255,0.5),rgba(255,53,196,0.5))]">
                        Committed to Eco-Friendly Materials
                    </div>
                    <p className='ml-auto w-[72%] pr-[60px] leading-relaxed' style={{ textAlign: 'justify' }}>We prioritize sustainability by choosing materials that are gentle on the planet. From organic fabrics to recycled fibers, every choice reflects our commitment to reducing environmental impact while maintaining quality and performance.</p>
                </div>
            </div>
            <div className="flex flex-row mb-[100px]">
                <div className="w-[55%] h-[400px] pl-[10%]">
                    <div className="w-[140px] h-[100px] relative"
                    >
                        <Image src={line_2} alt="line_2" fill className='object-contain' />
                        <p className='font-[700] absolute left-[35px] top-[35px]'>MISSION</p>
                    </div>
                    <div className="w-[60%]">
                        <p className="text-[30px] bg-gradient-to-r from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
                            Customers
                        </p>
                        <div className="w-[200px] h-[30px] relative -mt-[15px]">
                            <Image src={line_3} alt="line_3" fill className='object-contain' />
                        </div>
                        <p>Deliver innovative, tech-driven fashion with outstanding service.</p>
                    </div>
                    <div className="ml-auto w-[50%] my-[10px]">
                        <p className="text-[30px] bg-gradient-to-r from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
                            Employees
                        </p>
                        <div className="w-[200px] h-[30px] relative -mt-[15px]">
                            <Image src={line_4} alt="line_4" fill className='object-contain' />
                        </div>
                        <p>Build a fair, dynamic, and empowering work environment.</p>
                    </div>
                    <div className="w-[60%]">
                        <p className="text-[30px] bg-gradient-to-r from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
                            Community & Society
                        </p>
                        <div className="w-[300px] h-[30px] relative -mt-[15px]">
                            <Image src={line_5} alt="line_5" fill className='object-contain' />
                        </div>
                        <p>Act responsibly for the planet and contribute to social progress.</p>
                    </div>
                </div>
                <div className="relative w-[45%] h-[300px] bg-[white]">
                    <div className="w-full h-full absolute border-y-[150px] border-y-[#b77ff9] border-l-[80px] border-l-white border-r-[80px] border-r-[#b77ff9]">
                    </div>
                    <div className="ml-[10px] w-[calc(100%-10px)] absolute border-y-[150px] border-y-[#D9D9D9] border-l-[80px] border-l-transparent border-r-[80px] border-r-[#D9D9D9] flex justify-center items-center">

                    </div>
                    <div className='absolute z-30 left-1/2 top-[30%] transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center'>
                        <div className="z-30 w-[100px] h-[80px] relative"
                        >
                            <Image src={line_1} alt="line_1" fill className='object-contain' />
                            <p className='font-[600] absolute left-[25px] top-[25px]'>VISION</p>
                        </div>
                    </div>
                    <div className='absolute z-30 left-1/2 top-[40%] transform -translate-x-1/2 flex justify-center items-center'>
                        <p className="text-[36px] font-bold bg-gradient-to-r from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
                            2030
                        </p>
                    </div>
                    <div className='absolute z-30 left-1/2 top-[60%] transform -translate-x-1/2 flex justify-center items-center'>
                        <p className="text-[30px] bg-gradient-to-r from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
                            Global Expansion
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-[10px] mx-[10%] mb-[100px]">
                <div className="w-[300px] h-[200px] relative scale-120"
                >
                    <Image src={line_6} alt="line_6" fill className='object-contain' />
                    <p className='text-[20px] font-[700] absolute left-[100px] top-[85px]'>CORE VALUES</p>
                </div>
                <div className="flex justify-start">
                    <div className="w-[50%] h-[100px] relative"
                    >
                        <Image src={bar_1} alt="bar_1" fill className='object-contain' />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="w-[50%] h-[100px] relative"
                    >
                        <Image src={bar_2} alt="bar_2" fill className='object-contain' />
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="w-[50%] h-[100px] relative"
                    >
                        <Image src={bar_3} alt="bar_3" fill className='object-contain' />
                    </div>
                </div>
            </div>
        </div>);
}

export default AboutUs;