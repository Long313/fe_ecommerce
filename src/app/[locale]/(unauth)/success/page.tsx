'use client'

import Button from '@/components/Button/page';
import LanguageSwitcher from '@/components/LanguageSwitcher/page';
import useTranslation from '@/hooks/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import register_background from '../../../../images/register_background.svg';
import success from '../../../../images/success_icon.svg';

function Success() {
    const { t, locale } = useTranslation();
    const router = useRouter();
    return (<div className='flex'>
        <div className="z-20 fixed top-[10px] right-[20px] flex justify-center items-center text-left rounded-[12px] w-[120px] h-[34px] p-[2px]">
            <LanguageSwitcher />
        </div>
        <div
            className="w-1/2 flex flex-col justify-center items-center"
        >
            <Image src={success} alt="success_icon" width={120} height={120} />
            <h3 className="my-[20px] font-[600] text-[24px] bg-gradient-to-r from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">SUCCESS</h3>
            <p className='mb-[20px] text-center text-[16px]'>
                You’ve sucessfully signed up. <br />
                Click continue to go to our homepage.
            </p>
            <Button width="w-[300px]" rounded="rounded-none rounded-r-[20px]" title="Continue" onSubmit={() => router.push(`/${locale}/login`)} />
        </div>
        <div
            className="w-1/2 h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${register_background.src})` }}
        ></div>
    </div>);
}

export default Success;