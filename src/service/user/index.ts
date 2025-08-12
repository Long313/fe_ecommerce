import axiosInstance from "@/utils/axiosInstance";
export const updateUser = async (body: FormData) => {
    try {
        const response = await axiosInstance.post("/user", body);
        return response.data;
    } catch (error) {
        console.error("Update user error", error);
        throw error;
    }
};

export const getUser = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/user/${id}`);
        return response.data;
    } catch (error) {
        console.error("Get user infor error", error);
        throw error;
    }
};