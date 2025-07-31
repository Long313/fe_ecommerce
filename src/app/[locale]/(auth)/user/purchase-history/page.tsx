'use client'

import Image from "next/image"
import item from '../../../../../images/item.svg'
export default function PurchaseHistory() {
    return (
        <div className="mb-[100px] h-fit p-[2px] rounded-[4px] bg-gradient-to-b from-[#822FFF] to-[#FF35C4]">
            <div className="h-full rounded-[4px] bg-white dark:bg-black">
                <div className="p-[20px]">
                    <h1 className="text-[30px] font-bold bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
                        Purchase history
                    </h1>
                    <div className="relative pb-[20px]">
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#822FFF] to-[#FF35C4] opacity-20" />
                        <ul className="list-disc pl-[20px]">
                            <li>You can see your purchase history for both retail and online store</li>
                            <li>Please bring your receipt if you wish to return or exchange items at a store.</li>
                        </ul>
                    </div>
                    <div className="mt-[20px]">
                        <p className="mb-[20px]">4 ITEMS</p>
                        <div className="flex flex-col max-h-[580px] pb-[40px] overflow-y-scroll">
                            <div className="flex flex-row items-center mb-[20px]">
                                <div className="bg-[#F8F8F8] w-[162px] h-[178px] relative">
                                    <Image src={item} alt="product" fill className="object-contain" />
                                </div>
                                <div className="ml-[40px] flex-1">
                                    <p>Item G</p>
                                    <p className="mt-[10px]">Size: XL</p>
                                    <p className="mt-[10px]">Purchase date: 12/03/2025</p>
                                    <p className="mt-[10px]">Purchased at: Amax Thu Duc</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center mb-[20px]">
                                <div className="bg-[#F8F8F8] w-[162px] h-[178px] relative">
                                    <Image src={item} alt="product" fill className="object-contain" />
                                </div>
                                <div className="ml-[40px] flex-1">
                                    <p>Item G</p>
                                    <p className="mt-[10px]">Size: XL</p>
                                    <p className="mt-[10px]">Purchase date: 12/03/2025</p>
                                    <p className="mt-[10px]">Purchased at: Amax Thu Duc</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center mb-[20px]">
                                <div className="bg-[#F8F8F8] w-[162px] h-[178px] relative">
                                    <Image src={item} alt="product" fill className="object-contain" />
                                </div>
                                <div className="ml-[40px] flex-1">
                                    <p>Item G</p>
                                    <p className="mt-[10px]">Size: XL</p>
                                    <p className="mt-[10px]">Purchase date: 12/03/2025</p>
                                    <p className="mt-[10px]">Purchased at: Amax Thu Duc</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center mb-[20px]">
                                <div className="bg-[#F8F8F8] w-[162px] h-[178px] relative">
                                    <Image src={item} alt="product" fill className="object-contain" />
                                </div>
                                <div className="ml-[40px] flex-1">
                                    <p>Item G</p>
                                    <p className="mt-[10px]">Size: XL</p>
                                    <p className="mt-[10px]">Purchase date: 12/03/2025</p>
                                    <p className="mt-[10px]">Purchased at: Amax Thu Duc</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}