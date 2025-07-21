import { RegisterType, ServerError, VerifyOtpType } from '@/common/type';
import { baseURL } from '@/constants';
import axios, { AxiosError } from 'axios';


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


export const registerUser = async (body: RegisterType) => {
  try {
    const response = await axios.post(`${baseURL}/user/customer`, body);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ServerError>;
    if (axiosError.response) {
      const serverError = {
        status: axiosError.response.data.status,
        message: axiosError.response.data.message || "Đăng ký thất bại",
      };
      console.error("Server error:", serverError);
      throw serverError;
    } else if (axiosError.request) {
      console.error("No response from server:", axiosError.request);
      throw { message: "Không nhận được phản hồi từ máy chủ", status: 0 };
    } else {
      console.error("Unexpected error:", axiosError.message);
      throw { message: "Đã xảy ra lỗi trong quá trình đăng ký", status: 0 };
    }
  }
};

export const verifyOtpRegister = async (body: VerifyOtpType) => {
  try {
    const response = await axios.post(`${baseURL}/user/verify-otp-register`, body);
    return response.data;
  } catch (error) {
    console.error(error)
  }
};

