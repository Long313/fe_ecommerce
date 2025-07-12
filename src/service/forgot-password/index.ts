import { baseURL } from '@/constants';
import axios from 'axios'

export const forgotPassword = async (body: any) => {
  try {
    const response = await axios.post(`${baseURL}/user/forgot-password`, body);
    return response.data;
  } catch (error: any) {
    console.error(error)
  }
};

export const verifyOtpReset = async (body: any) => {
  try {
    const response = await axios.post(`${baseURL}/user/verify-otp-reset`, body);
    return response.data;
  } catch (error: any) {
    console.error(error)
  }
};

export const resetPassword = async (body: any) => {
  try {
    const response = await axios.post(`${baseURL}/user/reset-password`, body);
    return response.data;
  } catch (error: any) {
    console.error(error)
  }
};

