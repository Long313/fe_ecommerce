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
