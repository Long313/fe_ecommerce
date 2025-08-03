'use client';

import NextImage from "next/image";
import counpons from '@/images/coupon.svg';
import Button from "@/components/Button";

export default function Counpons() {

    const handleDownloadCounpons = async () => {
        try {
            const res = await fetch(counpons.src);
            const svgText = await res.text();

            const canvasWidth = 900;  // kích thước bạn muốn xuất file png
            const canvasHeight = 300;

            const canvas = document.createElement("canvas");
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            const img = new window.Image();

            img.onload = () => {
                const ctx = canvas.getContext("2d");
                if (!ctx) return;

                // Nền trắng
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);

                // Tính tỉ lệ giữ nguyên cho ảnh SVG
                const imgRatio = img.width / img.height;
                const canvasRatio = canvasWidth / canvasHeight;

                let drawWidth = canvasWidth;
                let drawHeight = canvasHeight;
                let offsetX = 0;
                let offsetY = 0;

                if (imgRatio > canvasRatio) {
                    // Ảnh rộng hơn canvas -> fix chiều rộng, scale chiều cao
                    drawHeight = canvasWidth / imgRatio;
                    offsetY = (canvasHeight - drawHeight) / 2;
                } else {
                    // Ảnh cao hơn canvas -> fix chiều cao, scale chiều rộng
                    drawWidth = canvasHeight * imgRatio;
                    offsetX = (canvasWidth - drawWidth) / 2;
                }

                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

                const pngUrl = canvas.toDataURL("image/png");

                const link = document.createElement("a");
                link.href = pngUrl;
                link.download = "coupon.png";
                link.click();
            };

            const svgBase64 = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgText)));
            img.src = svgBase64;

        } catch (error) {
            console.error("Download failed:", error);
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
                                src={counpons}
                                alt="coupon"
                                style={{ objectFit: "contain" }}
                                fill={false}
                                width={900}  // điều chỉnh theo tỉ lệ ảnh thật
                                height={300} // điều chỉnh chiều cao phù hợp
                            />
                        </div>
                        <Button title="DOWNLOAD COUPONS" onSubmit={handleDownloadCounpons} width="w-[200px]" height="h-[36px]" boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
