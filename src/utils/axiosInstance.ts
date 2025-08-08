'use client';
import axios from "axios";
import Cookies from "js-cookie"; // Cần cài: npm i js-cookie

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get("access_token");
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosInstance;
