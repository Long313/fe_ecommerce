export const locales = ['vi', 'en'];
export const GENDER = ['men', 'women', 'unisex'];
export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export const COLORS = ["white", "gray", "black", "pink", "blue", "purple"]
export const CATEGORIES = ["shoes", "shirts", "accessories", "trousers", "shorts", "socks", "skirts"]
export const VI = "vi";
export const EN = "en";
export const VIETNAMESE = "Vietnamese";
export const ENGLISH = "English";

// regex
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
export const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const GENDERS_LIST = [
    { label: "Male", value: "men" },
    { label: "Female", value: "women" },
    { label: "Unisex", value: "unisex" },
]

export const CATEGORIES_LIST = [
    { label: "Shoes", value: "shoes" },
    { label: "Shirts", value: "shirts" },
    { label: "Accessories", value: "accessories" },
    { label: "Trousers", value: "trousers" },
    { label: "Shorts", value: "shorts" },
    { label: "Socks", value: "socks" },
    { label: "Skirts", value: "skirts" },
]
