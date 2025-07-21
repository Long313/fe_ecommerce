import { ResendOtpType } from "@/common/type";
import { baseURL } from "@/constants";
import axios from "axios";

export const resendOtp = async (body: ResendOtpType) => {
  try {
    const response = await axios.post(`${baseURL}/user/resend-otp`, body);
    return response.data;
  } catch (error) {
    console.error(error)
  }
};