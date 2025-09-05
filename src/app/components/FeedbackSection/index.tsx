'use client'
import dynamic from "next/dynamic";
const FeedbackCard = dynamic(() => import('@/components/FeedbackCard'), { ssr: false });

export default function FeedbackSection() {

  return (
    <section className="flex flex-col mt-[100px] items-center px-[var(--padding-screen)]">
      <h2 className="text-[30px] text-[var(--text-color)] font-[700]">Feedback Corner</h2>
      <div className="flex flex-row flex-wrap justify-between w-full mt-[100px]">
        <FeedbackCard name="Emily Wilson" description="The customer experience was exceptional from start to finish. The website is user-friendly, the checkout process was smooth, and the clothes I ordered fit perfectly. I'm beyond satisfied!" />
        <FeedbackCard name="Sarah Thompson" description="I absolutely love the quality and style of the clothing I purchased from this website. customer service was outstanding, and I received my order quickly. Highly recommended!" />
        <FeedbackCard name="Olivia Martinez" description="I had a great experience shopping on this website. The clothes I bought are fashionable and comfortable. Highly satisfied!" />
      </div>
    </section>
  )
}