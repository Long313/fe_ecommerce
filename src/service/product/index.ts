import { ParamsSearchType } from "@/common/type";
import { baseURL } from "@/constants";
import axios from "axios";

export const searchProductByName = async (params: ParamsSearchType) => {
    try {
        const response = await axios.get(`${baseURL}/product`, {
            params,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getDetailProduct = async (id: string) => {
    try {
        const response = await axios.get(`${baseURL}/product/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteProduct = async (id: string) => {
    try {
        const response = await axios.delete(`${baseURL}/product/${id}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const createNewProduct = async (body: FormData) => {
    try {
        const response = await axios.post(`${baseURL}/product/create`, body, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


