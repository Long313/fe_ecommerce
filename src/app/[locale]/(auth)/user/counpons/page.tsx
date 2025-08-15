'use client';

import NextImage from "next/image";
import couponImg from '@/images/coupon.svg';
import dynamic from "next/dynamic";
const Button = dynamic(() => import('@/components/Button'), {
    ssr: false,
});
export default function Coupons() {

    const downloadCoupon = async () => {
        try {
            const svgText = await fetch(couponImg.src).then(res => res.text());

            const canvas = document.createElement("canvas");
            const canvasWidth = 900;
            const canvasHeight = 300;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const img = new Image();
            img.onload = () => {
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);

                const imgRatio = img.width / img.height;
                const canvasRatio = canvasWidth / canvasHeight;
                let drawWidth, drawHeight, offsetX, offsetY;

                if (imgRatio > canvasRatio) {
                    drawHeight = canvasWidth / imgRatio;
                    drawWidth = canvasWidth;
                    offsetX = 0;
                    offsetY = (canvasHeight - drawHeight) / 2;
                } else {
                    drawWidth = canvasHeight * imgRatio;
                    drawHeight = canvasHeight;
                    offsetX = (canvasWidth - drawWidth) / 2;
                    offsetY = 0;
                }

                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

                const link = document.createElement("a");
                link.href = canvas.toDataURL("image/png");
                link.download = "coupon.png";
                link.click();
            };

            img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgText)))}`;

        } catch (err) {
            console.error("Failed to download coupon:", err);
        }
    };

    return (
        <div className="h-fit p-[2px] rounded-[4px] bg-gradient-to-b from-[#822FFF] to-[#FF35C4]">
            <div className="h-full rounded-[4px] bg-white dark:bg-black">
                <div className="p-[20px] pb-[40px]">
                    <h1 className="text-[30px] font-bold bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
                        Coupons
                    </h1>
                    <p className="my-[10px]">Instore Coupons | 1 Available Coupon</p>
                    <div className="flex flex-col justify-center items-center w-full">
                        <div className="w-[90%] h-[300px] relative flex justify-center items-center">
                            <NextImage
                                src={couponImg}
                                alt="coupon"
                                style={{ objectFit: "contain" }}
                                width={900}
                                height={300}
                                priority
                            />
                        </div>
                        <Button
                            title="DOWNLOAD COUPONS"
                            onSubmit={downloadCoupon}
                            width="w-[200px]"
                            height="h-[36px]"
                            boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
