import { baseURL } from "@/constants";
import axios from "axios";

export const resendOtp = async (body: any) => {
  try {
    const response = await axios.post(`${baseURL}/user/resend-otp`, body);
    return response.data;
  } catch (error: any) {
    console.error(error)
  }
};