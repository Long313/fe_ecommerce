export type ServerError = {
    status: number;
    message: string;
};

export type EmailType = {
    email: string;
}

export type PurposeType = {
    purpose: string;
}

export type PasswordType = {
    password: string;
}

export type NewPasswordType = {
    newPassword: string;
}

export type PhoneType = {
    phoneNumber: string;
}

export type OtpType = {
    otp: string;
}

export enum GENDER {
    MALE = "male",
    FEMALE = "female",
    UNISEX = "unisex",
}

export enum ROLE {
    ADMIN = "admin",
    CUSTOMER = "customer",
}

export enum ISACTIVE {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

export type LoginType = EmailType & PasswordType;

export type ResetPasswordType = EmailType & NewPasswordType;

export type RegisterType = EmailType & PasswordType & PhoneType;

export type VerifyOtpType = EmailType & OtpType;

export type ResendOtpType = EmailType & PurposeType;

export type ParamsSearchType = {
    search?: string;
    gender?: string;
    category?: string;
    startPrice?: string;
    endPrice?: string;
    pageSize?: number,
    pageIndex?: number,
    sort?: string
};

export interface ProductProps {
    id?: string | number,
    image_url: string,
    width?: number,
    height?: number,
    name?: string,
    price?: number | string,
    rate?: number | string;
}

export interface ProductDetailProps {
    id: string | number,
    name: string,
    category: string,
    description: string,
    price: number | string,
    image_url: string,
    gender: string;
}

export interface UserInfor {
    id?: string;
    fullname: string | null;
    email: string | null;
    phone_number?: string;
    gender?: GENDER;
    role?: ROLE
    status?: ISACTIVE
    refresh_token?: string;
    created_at?: string;
    created_by?: string | null;
    updated_at?: string;
    updated_by?: string | null;
    deleted_at?: string | null;
    deleted_by?: string | null;
}