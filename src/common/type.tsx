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
    MEN = "men",
    WOMEN = "women",
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
    gender?: string[];
    category?: string[];
    type?: string;
    startPrice?: string;
    endPrice?: string;
    pageSize?: number,
    pageIndex?: number,
    sort?: string,
};

export type ParamsSearchProvincesType = {
    page: number,
    size: number,
    query?: string,
};

export interface ProvincesProps {
    id: string,
    name: string,
    type: number,
    typeText: string,
    slug: string
}

export interface ProductProps {
    id?: string | number,
    image_url: string,
    width?: number,
    height?: number,
    name?: string,
    price?: number | string,
    star?: number | string,
    quantity?: number,
    color?: string,
}

export interface ProductBtnProps extends ProductProps {
    onRemove?: () => void;
}

export interface ProductDetailProps {
    id: string | number,
    name: string,
    category: string,
    description: string,
    price: number | string,
    image_url: string,
    gender: string;
    size: string;
    quantity?: number,
    rate?: number | string,
    color?: string,
}

export interface UserInfor {
    id?: string;
    fullname: string | null;
    email: string | null;
    phone_number?: string;
    gender?: GENDER;
    avatar?: string;
    address?: string;
    birthday?: string;
    role?: ROLE;
    status?: ISACTIVE;
    refresh_token?: string;
    created_at?: string;
    created_by?: string | null;
    updated_at?: string;
    updated_by?: string | null;
    deleted_at?: string | null;
    deleted_by?: string | null;
}

export type InputProps = {
    title: string,
    name: string,
    type: string,
    width?: string,
    minWidth?: string,
    height?: string,
    placeholder?: string,
    defaultValue?: string,
    dataSelect?: {
        id?: string; label: string; value: string
    }[],
    onGetData: (name: string, value: string, id?: string) => void;
}