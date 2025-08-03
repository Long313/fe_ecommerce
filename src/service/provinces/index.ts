import { ParamsSearchProvincesType } from "@/common/type";
import axios from "axios";

export const searchCity = async (params: ParamsSearchProvincesType) => {
    try {
        const response = await axios.get(`https://open.oapi.vn/location/provinces`, {
            params,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const searchDistrict = async (cityId : string,params: ParamsSearchProvincesType) => {
    try {
        const response = await axios.get(`https://open.oapi.vn/location/districts/${cityId}`, {
            params,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const searchWard = async (districtId : string,params: ParamsSearchProvincesType) => {
    try {
        const response = await axios.get(`https://open.oapi.vn/location/wards/${districtId}`, {
            params,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};