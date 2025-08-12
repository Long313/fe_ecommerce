import { StaticImport } from "next/dist/shared/lib/get-img-props";

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

export type CurrentPasswordType = {
    currentPassword: string;
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

export type ChangePasswordType = CurrentPasswordType & NewPasswordType;

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
    image_url?: string | StaticImport | undefined,
    width?: number,
    height?: number,
    name?: string,
    price?: number | string,
    star?: number | string,
    quantity?: number,
    color?: string,
}

export interface ProductBtnProps extends ProductProps {
    onRemove: () => void;
    onAdd: () => void;
}

export interface ProductDetailProps {
    id?: string,
    name?: string,
    category?: string,
    description?: string,
    price?: number | string,
    image_url?: string | StaticImport,
    image?: File | string | null;
    gender?: string;
    type?: string;
    size?: string;
    quantity?: number,
    star?: number | string,
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
    star?: boolean,
    type: string,
    width?: string,
    minWidth?: string,
    height?: string,
    margin?: string,
    placeholder?: string,
    defaultValue?: string,
    dataSelect?: {
        id?: string; label: string; value: string
    }[],
    onGetData: (name: string, value: string, id?: string) => void;
}

export type addressListProps =
    {
        name: string,
        phone: string,
        address: string,
        street: string,
        ward: string,
        district: string,
        city: string,
        default: boolean
    }

export type PriceInputProps = {
    name: string,
    title: string,
    value: string,
    margin?: string,
    minWidth?: string,
    maxWidth?: string,
    width?: string,
    onGetValue: (name: string, value: string) => void
}

