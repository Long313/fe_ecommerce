'use client'

import { create } from 'zustand';

export const useStore = create((set : any) => ({
  // dark mode state
  mode: false,
  setMode: (state: boolean) => set({ mode : state }),
}));
