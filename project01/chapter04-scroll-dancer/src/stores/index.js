import { create } from "zustand";

export const useAppStore = create((set) => ({
	isEntered: false,
	setIsEntered: (value) => set({ isEntered: value }),
}));
