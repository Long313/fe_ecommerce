'use client'

import { create } from 'zustand';

interface StoreState {
  mode: boolean;
  setMode: (state: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  mode: false,
  setMode: (state) => set({ mode: state }),
}));
