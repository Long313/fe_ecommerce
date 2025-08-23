'use client'

import Image from "next/image";
import itemImg from '@/images/item.svg';

type PurchaseItem = {
    name: string;
    size: string;
    date: string;
    store: string;
};

const purchaseHistory: PurchaseItem[] = [
    { name: "Item G", size: "XL", date: "12/03/2025", store: "Amax Thu Duc" },
    { name: "Item H", size: "L", date: "15/03/2025", store: "Amax Thu Duc" },
    { name: "Item I", size: "M", date: "18/03/2025", store: "Amax Thu Duc" },
    { name: "Item J", size: "S", date: "20/03/2025", store: "Amax Thu Duc" },
];

function PurchaseItemCard({ item }: { item: PurchaseItem }) {
    return (
        <div className="flex flex-row items-center mb-5">
            <div className="bg-[#F8F8F8] w-[162px] h-[178px] relative">
                <Image src={itemImg} alt={item.name} fill className="object-contain" />
            </div>
            <div className="ml-[40px] flex-1">
                <p>{item.name}</p>
                <p className="mt-2">Size: {item.size}</p>
                <p className="mt-2">Purchase date: {item.date}</p>
                <p className="mt-2">Purchased at: {item.store}</p>
            </div>
        </div>
    );
}

export default function PurchaseHistory() {
    return (
        <div className="mb-24 h-fit p-[2px] rounded-[4px] bg-gradient-to-b from-[#822FFF] to-[#FF35C4]">
            <div className="h-full rounded-[4px] bg-white">
                <div className="p-5">
                    <h1 className="text-3xl font-bold bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
                        Purchase history
                    </h1>
                    <div className="relative pb-5">
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#822FFF] to-[#FF35C4] opacity-20" />
                        <ul className="list-disc pl-5">
                            <li>You can see your purchase history for both retail and online store</li>
                            <li>Please bring your receipt if you wish to return or exchange items at a store.</li>
                        </ul>
                    </div>

                    <div className="mt-5">
                        <p className="mb-5">{purchaseHistory.length} ITEMS</p>
                        <div className="flex flex-col max-h-[580px] pb-10 overflow-y-scroll custom-scroll custom-color">
                            {purchaseHistory.map((item, index) => (
                                <PurchaseItemCard key={index} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
