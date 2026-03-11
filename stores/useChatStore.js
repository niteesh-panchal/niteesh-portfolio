import { create } from "zustand";

export const useChatStore = create((set) => ({
  message: "",
  answer: "",
  showIntroText: true,
  isLoading: false,

  setMessage: (message) => set({ message }),
  setAnswer: (answer) => set({ answer }),
  setShowIntroText: (showIntroText) => set({ showIntroText }),
  setIsLoading: (isLoading) => set({ isLoading }),

  resetChatInput: () => set({ message: "" }),
}));
