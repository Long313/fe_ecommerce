'use client'
import dynamic from "next/dynamic";
import { useMemo } from "react";
const Clock = dynamic(() => import('@/components/Clock'), { ssr: false });
const Button = dynamic(() => import('@/components/Button'), { ssr: false });

export default function OfferSection() {
    const targetDate = useMemo(() => {
        return new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000 + 48 * 60 * 1000);
    }, []);
    return (
        <section className="flex flex-col my-[200px] items-center">
            <div className="flex justify-end bg-[url('../../images/discount.svg')] bg-cover bg-center w-full h-[600px]">
                <div className="w-1/2 mt-[50px]">
                    <h2 className="font-[700] text-[40px]">Exclusive offer</h2>
                    <p className="my-[50px] font-[600]">Unlock the ultimate style upgrade with our exclusive <br /> offer Enjoy savings of up to 40% off on our latest New <br /> Arrivals</p>
                    <Clock targetDate={targetDate} />
                    <Button title="BUY NOW" onSubmit={() => { }} width="w-[200px]" height="h-[50px]" margin="my-[50px]" boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" />
                </div>
            </div>
        </section>
    )
}