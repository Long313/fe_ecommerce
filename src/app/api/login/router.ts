import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { baseURL } from '@/constants';

export async function POST(req: Request) {
    const body = await req.json();

    try {
        const laravelResponse = await axios.post(
            `${baseURL}/api/auth/login`,
            body,
            {
                withCredentials: true,
            }
        );

        const setCookie = laravelResponse.headers['set-cookie'];

        const response = NextResponse.json({ success: true });

        if (setCookie) {
            response.headers.set('Set-Cookie', setCookie.join('; ')); // chú ý Laravel có thể trả nhiều cookie
        }

        return response;
    } catch (error) {
        const axiosError = error as AxiosError;

        console.error(
            axiosError.response?.data || axiosError.message || 'Unknown error'
        ); return NextResponse.json(
            { success: false, message: 'Login failed' },
            { status: 401 }
        );
    }
}
