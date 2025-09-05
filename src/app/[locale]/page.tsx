'use client'
import { tabs } from "@/constants";
import { useProductSearch } from "@/hooks/useProductSearch";
import useTranslation from "@/hooks/useTranslation";
import accessories from "@/images/accessories.svg";
import clothes from "@/images/clothes.svg";
import shoes from "@/images/shoes.svg";
import { useStore } from "@/store/store";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import home_img from '../../images/home_img.svg';
import BestSellingSection from "../components/BestSellingSection";
import TypingText from "../components/TypingText/intex";
import Banner from "@/components/Banner";
const Product = dynamic(() => import("@/components/Product"), { ssr: false });
const ProductNoPrice = dynamic(() => import("@/components/ProductNoPrice"), { ssr: false });
const Button = dynamic(() => import("@/components/Button"), { ssr: false });
const OfferSection = dynamic(() => import("../components/OfferSection"), { ssr: false });
const FeedbackSection = dynamic(() => import("../components/FeedbackSection"), { ssr: false });

export default function Home() {
  // const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('SALE');
  const router = useRouter();
  const { locale } = useTranslation();

  const params = useMemo(() => {
    const base: Record<string, string | number> = {};
    if (activeTab === 'SALE') base.type = "sale";
    else if (activeTab === 'HOT') base.type = "hot";
    else if (activeTab === 'NEW ARRIVALS') base.type = "new arrivals";
    else if (activeTab === 'ACCESSORIES') base.category = 'accessories';
    base.pageSize = 4;
    return base;
  }, [activeTab]);

  const { data: productData } = useProductSearch(params);
  const { data: productSaleData } = useProductSearch({ type: "sale", pageSize: 4 });

  // const { resetParamsSearch } = useStore();

  // const handleExplore = useCallback(() => {
  //   resetParamsSearch();
  //   router.push(`/${locale}/products`);
  // }, [router, locale]);

  const handeRouter = (value: string) => {
    if (value === "clothes") {
      router.push(`/${locale}/products?category=shirts&category=trousers&category=shorts&category=skirts`);
    } else {
      router.push(`/${locale}/products?category=${value}`);
    }
  }

  const handleRouterSale = () => {
    router.push(`/${locale}/products?type=sale`);
  }

  return (
    <div className="flex-1 mt-[100px]">
      {/* <section className="flex justify-between">
        <div className="w-[45%] mt-[50px]">
          <p className="min-h-[140px] transition-transform font-[700] text-[46px] text-[var(--text-color)] tracking-[2px]">
            <TypingText text="Step Into Your Sporty Look!" />
          </p>
          <p className="font-[500] text-[20px] text-[var(--text-color)] mt-[60px] mb-[30px]">Elevate your game with curated athletic <br /> fashion and sleek accessories – tailored to <br /> your lifestyle.</p>
          <Button boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]"
            title="EXPLORE NOW" onSubmit={handleExplore} width="w-[160px]" height="h-[46px]" />
        </div>
        <div className="w-[45%] ml-auto">
          <div className="relative aspect-[632/795] w-3/4 ml-auto">
            <Image src={home_img} alt="home_image" fill className="w-full h-full object-contain" />
          </div>
        </div>
      </section> */}
      <Banner />
      <BestSellingSection data={productSaleData?.data} onSeeAll={handleRouterSale} />
      <section className="flex flex-col mt-[100px] items-center px-[var(--padding-screen)]">
        <h2 className="text-[30px] text-[var(--text-color)] font-[700]">Our products </h2>
        <div className="mb-[150px] w-full h-[60px] px-[var(--padding-screen)] flex justify-center items-center bg-[#fff]">
          <div className="w-5/10">
            <nav className="w-full">
              <ul className="flex w-full justify-between">
                {tabs.map((tab) => (
                  <li key={tab.label} className="relative group cursor-pointer">
                    <span
                      onClick={() => setActiveTab(tab.label)}
                      className="relative z-10"
                    >
                      {tab.label}
                    </span>
                    <span
                      className={`absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-[#822FFF] to-[#FF35C4] transform transition-transform duration-300 origin-left
              ${activeTab === tab.label ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
            `}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-32 w-full max-w-7xl mx-auto">
          {productData?.data?.map((data) => (
            <div key={data.id} className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] max-w-[250px] flex justify-center items-center">
              <Product {...data} />
            </div>
          ))}
        </div>
      </section>
      <OfferSection />
      <section className="flex flex-col mt-[100px] items-center px-[var(--padding-screen)]">
        <h2 className="text-[30px] text-[var(--text-color)] font-[700]">Designer Clothes For You</h2>
        <p className="mt-[20px] mb-[100px] font-[600] text-center max-w-[700px]">
          Own every move with high-performance sportswear built for style and power!
        </p>
        <div className="flex flex-wrap justify-between mb-[100px] w-full">
          <div className="w-[30%]" onClick={() => handeRouter("clothes")}>
            <ProductNoPrice name="Clothes" description="Finish your athletic look with essential sportswear – from sweat-wicking shirts to stretch-fit pants and training sets." image={clothes} />
          </div>
          <div className="w-[30%]" onClick={() => handeRouter("shoes")}>
            <ProductNoPrice name="Shoes" description="Discover sporty footwear that blends comfort, function, and style – perfect for workouts or street-ready looks." image={shoes} />
          </div>
          <div className="w-[30%]" onClick={() => handeRouter("accessories")}>
            <ProductNoPrice name="Accessories" description="Complete your sporty look with essential accessories like caps, gym bags, socks, and water bottles." image={accessories} />
          </div>
        </div>
      </section>
      <FeedbackSection />
    </div>
  );
}
