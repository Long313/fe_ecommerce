'use client'

import { create } from 'zustand';

interface StoreState {
  mode: boolean;
  emailAuthen: string;
  typeOtpAuthen: string;
  passwordAuthen: string;
  search: boolean;
  setMode: (state: boolean) => void;
  setSearch: (state: boolean) => void;
  setEmailAuthen: (state: string) => void;
  setTypeOtpAuthen: (state: string) => void;
  setPasswordAuthen: (state: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  mode: false,
  search: false,
  emailAuthen: "",
  typeOtpAuthen: "",
  passwordAuthen: "",
  setMode: (state) => set({ mode: state }),
  setSearch: (state) => set({ search: state }),
  setEmailAuthen: (state) => set({ emailAuthen: state }),
  setTypeOtpAuthen: (state) => set({ typeOtpAuthen: state }),
  setPasswordAuthen: (state) => set({ passwordAuthen: state }),
}));
