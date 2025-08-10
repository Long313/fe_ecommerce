'use client'
import Button from "@/components/Button";
import Product from "@/components/Product";
import ProductNoPrice from "@/components/ProductNoPrice";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import home_img from '../../images/home_img.svg';
import clothes from "@/images/clothes.svg";
import shoes from "@/images/shoes.svg";
import accessories from "@/images/accessories.svg";
import { useStore } from "@/store/store";
import dynamic from "next/dynamic";
import { useProductSearch } from "@/hooks/useProductSearch";
import useTranslation from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";
const FeedbackCard = dynamic(() => import('@/components/FeedbackCard'), { ssr: false });
const Clock = dynamic(() => import('@/components/Clock'), { ssr: false });
const tabs = [
  { label: 'SALE' },
  { label: 'HOT' },
  { label: 'NEW ARRIVALS' },
  { label: 'ACCESSORIES' },
]
export default function Home() {
  // const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('SALE');
  const fullText = "Step Into Your Sporty Look!";
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
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


  const targetDate = useMemo(() => {
    return new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000 + 48 * 60 * 1000);
  }, []);

  useEffect(() => {
    if (!isTyping) return;
    const timeout = setTimeout(() => {
      setIndex((prev) => {
        if (prev < fullText.length) return prev + 1;
        setIsTyping(false);
        return prev;
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [index, isTyping]);
  const { resetParamsSearch } = useStore();

  const handleExplore = () => {
    resetParamsSearch();
    router.push(`/${locale}/products`);
  }

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
    <div className="flex-1 mt-[110px] px-[var(--padding-screen)]">
      <section className="flex justify-between">
        <div className="w-[45%] mt-[50px]">
          <p className="min-h-[140px] transition-transform font-[700] text-[46px] text-[var(--text-color)] tracking-[2px]">
            {fullText.slice(0, index)}
            {isTyping && <span className="animate-blink">|</span>}
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
      </section>
      <section className="flex flex-col mt-[100px] items-center">
        <h2 className="text-[30px] text-[var(--text-color)] font-[700]">Best selling</h2>
        <p className="text-[var(--text-color)] mt-[20px] mb-[150px] font-[600]">Stay on trend with our best-selling sportwear picks.</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 w-full max-w-7xl mx-auto">
          {/* {productData.slice(0, 4).map((data, i) => (
            <div key={i} className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] max-w-[250px]">
              <Product {...data} />
            </div>
          ))} */}
          {productSaleData?.data?.map((data, i) => (
            <div key={i} className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] max-w-[250px]">
              <Product {...data} />
            </div>
          ))}
        </div>
        <div className="mt-[80px] mb-[60px]">
          <Button boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]"
            title="SEE ALL" onSubmit={handleRouterSale} width="w-[160px]" height="h-[46px]" arrow={true} />
        </div>
      </section>
      <section className="flex flex-col mt-[100px] items-center">
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
          {productData?.data?.map((data, i) => (
            <div key={i} className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] max-w-[250px]">
              <Product {...data} />
            </div>
          ))}
        </div>
      </section>
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
      <section className="flex flex-col mt-[100px] items-center">
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
      <section className="flex flex-col mt-[100px] items-center">
        <h2 className="text-[30px] text-[var(--text-color)] font-[700]">Feedback Corner</h2>
        <div className="flex flex-row flex-wrap justify-between w-full mt-[100px]">
          <FeedbackCard name="Emily Wilson" description="The customer experience was exceptional from start to finish. The website is user-friendly, the checkout process was smooth, and the clothes I ordered fit perfectly. I'm beyond satisfied!" />
          <FeedbackCard name="Sarah Thompson" description="I absolutely love the quality and style of the clothing I purchased from this website. customer service was outstanding, and I received my order quickly. Highly recommended!" />
          <FeedbackCard name="Olivia Martinez" description="I had a great experience shopping on this website. The clothes I bought are fashionable and comfortable. Highly satisfied!" />
        </div>
      </section>
    </div>
  );
}
