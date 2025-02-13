import { create } from "zustand";

interface State {
  isSideBarOpen: boolean;
  toggleSideBar: () => void;
}

export const useUIStore = create<State>()((set) => ({
  isSideBarOpen: false,
  toggleSideBar: () =>
    set((state) => ({ isSideBarOpen: !state.isSideBarOpen })),
}));
