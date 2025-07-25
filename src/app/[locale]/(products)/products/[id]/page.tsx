'use client'
import { useParams } from 'next/navigation';

export default function ProductDetail() {
    const params = useParams();

    const id = params.id;
    console.log("router", id);
    return (<div className="w-full h-full my-[200px] px-[var(--padding-screen)] flex">
        {id}
    </div>)
}