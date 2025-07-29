export const locales = ['vi', 'en'];
export const GENDER = ['male', 'female', 'unisex'];
export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export const COLORS = ["white", "gray", "black", "pink", "blue", "purple"]

export const VI = "vi";
export const EN = "en";
export const VIETNAMESE = "Vietnamese";
export const ENGLISH = "English";

//  regex
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
export const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;


