import { baseURL } from '@/constants';
import axios from 'axios';


/*
export const postUser = async ({ name, email, role }) => {
  const response = await axios.post(
    '/users',
    { name, email }, // body
    {
      params: { role }, // param nằm trên URL
    }
  );
  return response.data;
};
*/


export const registerUser = async (body: any) => {
  try {
    const response = await axios.post(`${baseURL}/user/customer`, body);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const serverError = {
        status: error.response.data.status,
        message: error.response.data.message || "Đăng ký thất bại"
      };
      console.error("Server error:", serverError);
      throw serverError; // 
    } else if (error.request) {
      console.error("No response from server:", error.request);
      throw { message: "Không nhận được phản hồi từ máy chủ", status: 0 };
    } else {
      console.error("Unexpected error:", error.message);
      throw { message: "Đã xảy ra lỗi trong quá trình đăng ký", status: 0 };
    }
  }
};

export const verifyOtpRegister = async (body: any) => {
  try {
    const response = await axios.post(`${baseURL}/user/verify-otp-register`, body);
    return response.data;
  } catch (error) {
    console.error(error)
  }
};

