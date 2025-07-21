import { baseURL } from "@/constants";
import axios from "axios";

export const searchProductByName = async (search: string) => {
    try {
        const response = await axios.get(`${baseURL}/user/product`, {
            params: { search },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
