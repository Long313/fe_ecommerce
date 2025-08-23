'use client';

import dayjs from 'dayjs';
import { useStore } from '@/store/store';
import NextImage from 'next/image';
import dynamic from 'next/dynamic';
import { useMemo, useCallback } from 'react';

const QRCode = dynamic(() => import('react-qr-code'), { ssr: false });
const Button = dynamic(() => import('@/components/Button'), { ssr: false });

function getInitials(name: string): string {
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0][0]?.toUpperCase() || '';
    return `${words[0][0]?.toUpperCase() || ''}${words[words.length - 1][0]?.toUpperCase() || ''}`;
}

export default function UserInfor() {
    const { avatar, fullname, phone_number, gender, email, birthday, address } =
        useStore((state) => state.userInfor);
    console.log("avatar", avatar);
    const formattedBirthday = useMemo(
        () => (birthday ? dayjs(birthday).format('MM/DD/YYYY') : '01/01/2001'),
        [birthday]
    );

    const qrValue = useMemo(() => (email ? `amax-${email}` : 'no-membership'), [email]);

    const handleDownloadQr = useCallback(() => {
        const svg = document.getElementById('qr-code') as SVGSVGElement | null;
        if (!svg) return;

        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svg);

        const canvas = document.createElement('canvas');
        const img = new Image();
        const size = 512;

        canvas.width = size;
        canvas.height = size;

        img.onload = () => {
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, size, size);
            ctx.drawImage(img, 0, 0, size, size);

            const pngUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = pngUrl;
            link.download = 'membership-qr.png';
            link.click();
        };

        img.src =
            'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
    }, []);

    return (
        <div className="h-fit p-[2px] rounded-[4px] bg-gradient-to-b from-[#822FFF] to-[#FF35C4]">
            <div className="h-full rounded-[4px] bg-white">
                <div className="p-[20px] pb-[40px]">
                    <h1 className="text-[30px] font-bold bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
                        Profile
                    </h1>

                    {/* User Info */}
                    <div className="flex flex-row justify-start mt-[40px] relative pb-[20px]">
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#822FFF] to-[#FF35C4] opacity-20" />
                        <div className="p-[2px] rounded-full bg-gradient-to-b from-[#822FFF] to-[#FF35C4] w-[100px] h-[100px]">
                            {avatar ? (
                                <NextImage
                                    src={avatar}
                                    alt="avatar"
                                    width={96}
                                    height={96}
                                    className="rounded-full object-cover w-full h-full"
                                />
                            ) : (
                                <div className="w-[96px] h-[96px] rounded-full bg-gray-300 flex items-center justify-center text-white text-[36px] font-bold tracking-widest">
                                    {getInitials(fullname ?? 'USER')}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col ml-[40px]">
                            <UserInfoField label="Name" value={fullname ?? ''} />
                            <UserInfoField label="Birthday" value={formattedBirthday ?? ''} />
                            <UserInfoField label="Mobile phone" value={phone_number ?? ''} />
                        </div>

                        <div className="flex flex-col ml-[40px]">
                            <UserInfoField label="Email address" value={email ?? ''} />
                            <UserInfoField label="Address" value={address ?? ''} />
                            <UserInfoField label="Gender" value={gender ?? ''} className="capitalize" />
                        </div>
                    </div>

                    {/* QR Section */}
                    <div className="mt-[20px] flex flex-col justify-center items-center">
                        <p className="font-[600]">Membership QR-code</p>
                        <div className="w-[100px] h-[100px] mt-[10px]">
                            <QRCode id="qr-code" value={qrValue} className="w-full h-full" />
                        </div>
                        <p className="my-[20px]">
                            Please show your membership QR-code at the cashier when you purchase items.
                        </p>
                        <Button
                            title="DOWNLOAD QR-CODE"
                            onSubmit={handleDownloadQr}
                            width="w-[200px]"
                            height="h-[40px]"
                            boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function UserInfoField({
    label,
    value,
    className = '',
}: {
    label: string;
    value: string;
    className?: string;
}) {
    return (
        <div className="mt-[30px] min-w-[160px] min-h-[80px] first:mt-0">
            <p className="font-[600]">{label}</p>
            <p className={className}>{value}</p>
        </div>
    );
}
