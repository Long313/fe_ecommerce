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
    console.log("error:", error)
    // Xử lý lỗi chi tiết hơn nếu cần
    if (error.response) {
      // Lỗi từ phía server (4xx, 5xx)
      console.error('Server responded with error:', error.response.data);
      throw new Error(error.response.data.message || 'Đăng ký thất bại');
    } else if (error.request) {
      // Request đã gửi nhưng không nhận được phản hồi
      console.error('No response from server:', error.request);
      throw new Error('Không nhận được phản hồi từ máy chủ');
    } else {
      // Lỗi khác
      console.error('Unexpected error:', error.message);
      throw new Error('Đã xảy ra lỗi trong quá trình đăng ký');
    }
  }
};
