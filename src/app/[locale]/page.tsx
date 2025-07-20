'use client'
import Button from "@/components/Button/page";
import useTranslation from "@/hooks/useTranslation";
import Image from "next/image";
import home_img from '../../images/home_img.svg';
import Product from "@/components/Product/page";
import item from "../../images/item.svg";
import Link from "next/link";
import discount from '../../images/discount.svg';
import Clock from "@/components/Clock/page";
import ProductNoPrice from "@/components/ProductNoPrice/page";
import { useState } from "react";
import FeedbackCard from "@/components/FeedbackCard/page";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Home() {
  const { t } = useTranslation()
  const targetDate = new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000 + 48 * 60 * 1000);
  const tabs = [
    { label: 'SALE' },
    { label: 'HOT' },
    { label: 'NEW ARRIVALS' },
    { label: 'ACCESSORIES' },
  ];
  const [activeTab, setActiveTab] = useState<string>('SALE');


  return (
    <div className="flex-1 mt-[200px] px-[var(--padding-screen)]">
      <section className="flex justify-between">
        <div className="w-[45%] mt-[50px]">
          <p className="font-[700] text-[46px] text-[var(--text-color)] tracking-[2px]">Step Into Your <br /> Sporty Look!</p>
          <p className="font-[500] text-[20px] text-[var(--text-color)] mt-[60px] mb-[30px]">Elevate your game with curated athletic <br /> fashion and sleek accessories – tailored to <br /> your lifestyle.</p>
          <Button title="EXPLORE NOW" onSubmit={() => { }} width="w-[160px]" height="h-[46px]" />
        </div>
        <div className="w-[45%] ml-auto">
          <div className="aspect-[632/795] w-3/4 ml-auto">
            <Image src={home_img} alt="home_image" />
          </div>
        </div>
      </section>
      <section className="flex flex-col mt-[100px] items-center">
        <h2 className="text-[30px] text-[var(--text-color)] font-[700]">Best selling</h2>
        <p className="text-[var(--text-color)] mt-[20px] mb-[100px] font-[600]">Stay on trend with our best-selling sportwear picks.</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 w-full max-w-7xl mx-auto">
          <div className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] max-w-[250px]">
            <Product image={item} name="Item A" price={38.99} rate={5} />
          </div>
          <div className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] max-w-[250px]">
            <Product image={item} name="Item A" price={38.99} rate={5} />
          </div>
          <div className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] max-w-[250px]">
            <Product image={item} name="Item A" price={38.99} rate={5} />
          </div>
          <div className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] max-w-[250px]">
            <Product image={item} name="Item A" price={38.99} rate={5} />
          </div>
        </div>
        <div className="my-[60px]">
          <Button title="See all" onSubmit={() => { }} width="w-[160px]" height="h-[46px]" arrow={true} />
        </div>
      </section>
      <section className="flex flex-col mt-[100px] items-center">
        <h2 className="text-[30px] text-[var(--text-color)] font-[700]">Our products </h2>
        <div className="mt-[50px] mb-[100px] w-full h-[60px] px-[var(--padding-screen)] flex justify-center items-center bg-[#fff]">
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
          <div className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] max-w-[250px]">
            <Product image={item} name="Item A" price={38.99} rate={5} />
          </div>
          <div className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] max-w-[250px]">
            <Product image={item} name="Item A" price={38.99} rate={5} />
          </div>
          <div className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] max-w-[250px]">
            <Product image={item} name="Item A" price={38.99} rate={5} />
          </div>
          <div className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] max-w-[250px]">
            <Product image={item} name="Item A" price={38.99} rate={5} />
          </div>
          <div className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] max-w-[250px]">
            <Product image={item} name="Item A" price={38.99} rate={5} />
          </div>
          <div className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] max-w-[250px]">
            <Product image={item} name="Item A" price={38.99} rate={5} />
          </div>
          <div className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] max-w-[250px]">
            <Product image={item} name="Item A" price={38.99} rate={5} />
          </div>
          <div className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] max-w-[250px]">
            <Product image={item} name="Item A" price={38.99} rate={5} />
          </div>
        </div>
      </section>
      <section className="flex flex-col my-[200px] items-center">
        <div className="flex justify-end bg-[url('../../images/discount.svg')] bg-cover bg-center w-full h-[600px]">
          <div className="w-1/2 mt-[50px]">
            <h2 className="font-[700] text-[40px]">Exclusive offer</h2>
            <p className="my-[50px] font-[600]">Unlock the ultimate style upgrade with our exclusive <br /> offer Enjoy savings of up to 40% off on our latest New <br /> Arrivals</p>
            <Clock targetDate={targetDate} />
            <Button title="BUY NOW" onSubmit={() => { }} width="w-[200px]" height="h-[50px]" margin="my-[50px]" />
          </div>
        </div>
      </section>
      <section className="flex flex-col mt-[100px] items-center">
        <h2 className="text-[30px] text-[var(--text-color)] font-[700]">Designer Clothes For You</h2>
        <p className="my-[50px] font-[600] text-center max-w-[700px]">
          Own every move with high-performance sportswear built for style and power!
        </p>
        <div className="flex flex-wrap justify-between mb-[100px] w-full">
          <div className="w-1/3">
            <ProductNoPrice name="Clothes" description="Finish your athletic look with essential sportswear – from sweat-wicking shirts to stretch-fit pants and training sets." image={item} />
          </div>
          <div className="w-1/3">
            <ProductNoPrice name="Shoe" description="Discover sporty footwear that blends comfort, function, and style – perfect for workouts or street-ready looks." image={item} />
          </div>
          <div className="w-1/3">
            <ProductNoPrice name="Accessories" description="Complete your sporty look with essential accessories like caps, gym bags, socks, and water bottles." image={item} />
          </div>
        </div>
      </section>
      <section className="flex flex-col mt-[100px] items-center">
        <h2 className="text-[30px] text-[var(--text-color)] font-[700]">Feedback Corner</h2>
        {/* <div className="flex flex-row flex-wrap justify-between w-full mt-[100px]">
          <FeedbackCard />
          <FeedbackCard />
          <FeedbackCard />
        </div> */}
        <Swiper spaceBetween={20} slidesPerView={3} loop autoplay>
          <SwiperSlide>
            <FeedbackCard />
          </SwiperSlide>
          <SwiperSlide>
            <FeedbackCard />
          </SwiperSlide>
          <SwiperSlide>
            <FeedbackCard />
          </SwiperSlide>
          <SwiperSlide>
            <FeedbackCard />
          </SwiperSlide>
          <SwiperSlide>
            <FeedbackCard />
          </SwiperSlide>
          <SwiperSlide>
            <FeedbackCard />
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
}
