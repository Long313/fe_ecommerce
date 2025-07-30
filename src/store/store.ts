'use client'

import { GENDER, ISACTIVE, ROLE, UserInfor } from '@/common/type';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TokenSlice {
  accessToken: string;
  setAccessToken: (token: string) => void;
}

export const useAccessToken = create<TokenSlice>()(
  persist(
    (set) => ({
      accessToken: '',
      setAccessToken: (token) => set({ accessToken: token }),
    }),
    {
      name: 'access-token-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Thêm kiểu cho persist
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
    pageSize?: number;
    pageIndex?: number;
    sort?: string;
  };
  userInfor: UserInfor;
  resetParamsSearch: () => void;
  setUserInfor: (state: UserInfor) => void;
  setMode: (state: boolean) => void;
  setSearch: (state: boolean) => void;
  setEmailAuthen: (state: string) => void;
  setTypeOtpAuthen: (state: string) => void;
  setPasswordAuthen: (state: string) => void;
  setParamsSearch: (state: Partial<StoreState['paramsSearch']>) => void;
}

//  Dùng persist cho toàn bộ store, hoặc chỉ cho userInfor nếu cần tách riêng
export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      mode: false,
      search: false,
      emailAuthen: '',
      typeOtpAuthen: '',
      passwordAuthen: '',
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
        id: '',
        fullname: '',
        email: '',
        phone_number: '',
        gender: GENDER.UNISEX,
        role: ROLE.CUSTOMER,
        status: ISACTIVE.ACTIVE,
        refresh_token: '',
        created_at: '',
        created_by: null,
        updated_at: '',
        updated_by: null,
        deleted_at: null,
        deleted_by: null,
      },
      resetParamsSearch: () => set(() => ({ paramsSearch: {} })),
      setUserInfor: (state) =>
        set((prev) => ({
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
    }),
    {
      name: 'main-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userInfor: state.userInfor, //  Chỉ persist userInfor 
      }),
    }
  )
);
