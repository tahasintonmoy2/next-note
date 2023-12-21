import { create } from "zustand";
type BottomSheetStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useBottomSheet = create<BottomSheetStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
