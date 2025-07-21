import { EmailType, ResetPasswordType, VerifyOtpType } from '@/common/type';
import { baseURL } from '@/constants';
import axios from 'axios';

export const forgotPassword = async (body: EmailType) => {
  try {
    const response = await axios.post(`${baseURL}/user/forgot-password`, body);
    return response.data;
  } catch (error) {
    console.error(error)
  }
};

export const verifyOtpReset = async (body: VerifyOtpType) => {
  try {
    const response = await axios.post(`${baseURL}/user/verify-otp-reset`, body, {
      withCredentials: true,
    });

    return response.data;
  } catch (error: unknown) {
    console.error("Lỗi verifyOtpReset:", error);
    return null;
  }
};


export const resetPassword = async (body: ResetPasswordType) => {
  try {
    const response = await axios.post(`${baseURL}/user/reset-password`, body, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
};

