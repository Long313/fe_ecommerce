'use client'

import { ProductDetailProps } from "@/common/type";
import dynamic from "next/dynamic";
import React from "react";
const Button = dynamic(() => import('@/components/Button'), { ssr: false });
const Product = dynamic(() => import('@/components/Product'), { ssr: false });
type BestSellingSectionProps = { data: ProductDetailProps[] | undefined, onSeeAll: () => void }
function BestSellingSection(props: BestSellingSectionProps) {
  const { data, onSeeAll } = props;
  return (
    <section className="flex flex-col mt-[100px] items-center">
      <h2 className="text-[30px] text-[var(--text-color)] font-[700]">Best selling</h2>
      <p className="text-[var(--text-color)] mt-[20px] mb-[150px] font-[600]">
        Stay on trend with our best-selling sportwear picks.
      </p>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 w-full max-w-7xl mx-auto">
        {data?.map((item) => (
          <div
            key={item.id}
            className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] max-w-[250px] flex justify-center items-center"
          >
            <Product {...item} />
          </div>
        ))}
      </div>
      <div className="mt-[80px] mb-[60px] mx-auto">
        <Button
          boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]"
          title="SEE ALL"
          onSubmit={onSeeAll}
          width="w-[160px]"
          height="h-[46px]"
          arrow
        />
      </div>
    </section>
  );
}

export default React.memo(BestSellingSection);