import { ParamsSearchType } from "@/common/type";
import { baseURL } from "@/constants";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";

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

export const createNewProduct = async (body: FormData) => {
    try {
        const response = await axiosInstance.post("/product/create", body);
        return response.data;
    } catch (error) {
        console.error("Create product error", error);
        throw error;
    }
};

export const updateProduct = async (body: FormData) => {
    try {
        const response = await axiosInstance.post("/product/update", body);
        return response.data;
    } catch (error) {
        console.error("Update product error", error);
        throw error;
    }
};

export const deleteProduct = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`/product/${id}`);
        return response.data;
    } catch (error) {
        console.error("Delete product error", error);
        throw error;
    }
};


