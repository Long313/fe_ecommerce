'use client'

import { GENDER, ISACTIVE, ROLE, UserInfor } from '@/common/type';
import { create } from 'zustand';

interface StoreState {
  mode: boolean;
  emailAuthen: string;
  typeOtpAuthen: string;
  passwordAuthen: string;
  search: boolean;
  paramsSearch: {
    search?: string;
    gender?: string;
    category?: string;
    startPrice?: string;
    endPrice?: string;
    pageSize?: number,
    pageIndex?: number,
    sort?: string,
  };
  userInfor: UserInfor,
  setUserInfor: (state: UserInfor) => void;
  setMode: (state: boolean) => void;
  setSearch: (state: boolean) => void;
  setEmailAuthen: (state: string) => void;
  setTypeOtpAuthen: (state: string) => void;
  setPasswordAuthen: (state: string) => void;
  setParamsSearch: (state: Partial<StoreState["paramsSearch"]>) => void;
}

export const useStore = create<StoreState>((set) => ({
  mode: false,
  search: false,
  emailAuthen: "",
  typeOtpAuthen: "",
  passwordAuthen: "",
  paramsSearch: {
    search: '',
    gender: '',
    category: '',
    startPrice: '',
    endPrice: '',
    pageSize: 5,
    pageIndex: 1,
    sort: 'desc',
  },
  userInfor: {
    id: "",
    fullname: "",
    email: "",
    phone_number: "",
    gender: GENDER.UNISEX,
    role: ROLE.CUSTOMER,
    status: ISACTIVE.ACTIVE,
    refresh_token: "",
    created_at: "",
    created_by: null,
    updated_at: "",
    updated_by: null,
    deleted_at: null,
    deleted_by: null
  },
  setUserInfor: (state: UserInfor) => set((prev) => ({
    userInfor: {
      ...prev.userInfor,
      ...state,
    },
  })),
  setMode: (state) => set({ mode: state }),
  setSearch: (state) => set({ search: state }),
  setEmailAuthen: (state) => set({ emailAuthen: state }),
  setTypeOtpAuthen: (state) => set({ typeOtpAuthen: state }),
  setPasswordAuthen: (state) => set({ passwordAuthen: state }),
  setParamsSearch: (state) =>
    set((prev) => ({
      paramsSearch: {
        ...prev.paramsSearch,
        ...state,
      },
    })),
}));
