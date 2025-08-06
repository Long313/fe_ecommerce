'use client'

import Button from "@/components/Button";
import { useStore } from "@/store/store";
import NextImage from "next/image";
import QRCode from "react-qr-code";

export const dynamic = "force-dynamic";

export default function UserInfor() {
    const userInfor = useStore(state => state.userInfor);
    const { avatar, fullname, phone_number, gender, email, birthday, address } = userInfor;
    // const accessToken = useAccessToken(state => state.accessToken);
    // const router = useRouter();
    // const { locale } = useTranslation();
    // useEffect(() => {
    //     if (!accessToken) {
    //         router.push(`/${locale}/login`); 
    //     }
    // }, [accessToken]);

    // if (!accessToken) return null;
    // const qrRef = useRef<SVGSVGElement | null>(null);

    function getInitials(name: string): string {
        const words = name.trim().split(" ");
        if (words.length === 1) return words[0].charAt(0).toUpperCase();
        return (
            words[0].charAt(0).toUpperCase() +
            words[words.length - 1].charAt(0).toUpperCase()
        );
    }

    const handleDownloadQr = () => {
        const svg = document.getElementById("qr-code") as SVGSVGElement | null;
        if (!svg) return;

        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svg);

        const canvas = document.createElement("canvas");
        const img = new window.Image();
        const size = 512;

        canvas.width = size;
        canvas.height = size;

        img.onload = () => {
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, size, size);
            ctx.drawImage(img, 0, 0, size, size);

            const pngUrl = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = pngUrl;
            link.download = "membership-qr.png";
            link.click();
        };

        img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
    };

    return (
        <div className="h-fit p-[2px] rounded-[4px] bg-gradient-to-b from-[#822FFF] to-[#FF35C4]">
            <div className="h-full rounded-[4px] bg-white dark:bg-black">
                <div className="p-[20px] pb-[40px]">
                    <h1 className="text-[30px] font-bold bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
                        Profile
                    </h1>
                    <div className="flex flex-row justify-start mt-[40px] relative pb-[20px]">
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#822FFF] to-[#FF35C4] opacity-20" />
                        <div className="p-[2px] rounded-full bg-gradient-to-b from-[#822FFF] to-[#FF35C4] w-[100px] h-[100px]">
                            {avatar ? (
                                <NextImage
                                    src={avatar}
                                    alt="avatar"
                                    width={96}
                                    height={96}
                                    className="rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-[96px] h-[96px] rounded-full bg-gray-300 flex items-center justify-center text-white text-[36px] font-bold tracking-widest">
                                    {getInitials(fullname ?? "USER")}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col ml-[40px]">
                            <div>
                                <p className="font-[600]">Name</p>
                                <p>{fullname}</p>
                            </div>
                            <div className="mt-[30px]">
                                <p className="font-[600]">Birthday</p>
                                <p>{birthday ? birthday : "01/01/2001"}</p>
                            </div>
                            <div className="mt-[30px]">
                                <p className="font-[600]">Mobile phone</p>
                                <p>{phone_number}</p>
                            </div>
                        </div>
                        <div className="flex flex-col ml-[40px]">
                            <div>
                                <p className="font-[600]">Email address</p>
                                <p>{email}</p>
                            </div>
                            <div className="mt-[30px]">
                                <p className="font-[600]">Address</p>
                                <p className="max-w-[420px]">{address ? address : "Sky Building , 12 Tran Hung Dao Street, District 1, HCM City"}</p>
                            </div>
                            <div className="mt-[30px]">
                                <p className="font-[600]">Gender</p>
                                <p className="capitalize">{gender}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-[20px] flex flex-col justify-center items-center">
                        <p className="font-[600]">Membership QR-code</p>
                        <div className="w-[100px] h-[100px] mt-[10px]">
                            <QRCode id="qr-code" value={email ? `amax-${email}` : "no-membership"} className="w-full h-full" />
                        </div>
                        <p className="my-[20px]">Please show your membership QR-code at the cashier when you purchase items.</p>
                        <Button title="DOWNLOAD QR-CODE" onSubmit={handleDownloadQr} width="w-[200px]" height="h-[36px]" boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" />
                    </div>
                </div>
            </div>
        </div >
    )
}