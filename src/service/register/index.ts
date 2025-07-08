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
      // 👉 Lỗi từ phía server (4xx, 5xx)
      console.log("----",error.response.data.message)
      const serverError = {
        status: error.response.data.status,
        message: error.response.data.message || "Đăng ký thất bại"
      };
      console.error("📛 Server error:", serverError);
      throw serverError; // 👈 Ném object để onError nhận đầy đủ
    } else if (error.request) {
      // 👉 Không nhận được phản hồi từ server
      console.error("📛 No response from server:", error.request);
      throw { message: "Không nhận được phản hồi từ máy chủ", status: 0 };
    } else {
      // 👉 Lỗi không xác định
      console.error("📛 Unexpected error:", error.message);
      throw { message: "Đã xảy ra lỗi trong quá trình đăng ký", status: 0 };
    }
  }
};

