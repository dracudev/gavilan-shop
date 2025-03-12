import { create } from "zustand";

interface State {
  isSideBarOpen: boolean;
  isSearchFocused: boolean;
  toggleSideBar: () => void;
  setSearchFocus: (focus: boolean) => void;
}

export const useUIStore = create<State>()((set) => ({
  isSideBarOpen: false,
  isSearchFocused: false,
  toggleSideBar: () =>
    set((state) => ({ isSideBarOpen: !state.isSideBarOpen })),
  setSearchFocus: (focus: boolean) => set(() => ({ isSearchFocused: focus })),
}));
