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

export enum ROLE {
  ADMIN = "admin",
  USER = "user",
}

export type LoginType = EmailType & PasswordType;

export type ResetPasswordType = EmailType & NewPasswordType;

export type RegisterType = EmailType & PasswordType & PhoneType;

export type VerifyOtpType = EmailType & OtpType;

export type ResendOtpType = EmailType & PurposeType;

