import { LoginType, ServerError } from "@/common/type";
import { baseURL } from "@/constants";
import axios, { AxiosError } from "axios";

export const login = async (body: LoginType) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, body, {
      withCredentials: true, // 🔥 Cho phép nhận và gửi cookie
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ServerError>;

    if (axiosError.response) {
      const serverError: ServerError = {
        status: axiosError.response.data.status,
        message: axiosError.response.data.message || "Đăng nhập thất bại",
      };
      console.error("Server error:", serverError);
      throw serverError;
    } else if (axiosError.request) {
      console.error("No response from server:", axiosError.request);
      throw { message: "Không nhận được phản hồi từ máy chủ", status: 0 };
    } else {
      console.error("Unexpected error:", axiosError.message);
      throw { message: "Đã xảy ra lỗi trong quá trình đăng nhập", status: 0 };
    }
  }
};