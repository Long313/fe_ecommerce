'use client'

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
