import { create } from "zustand";

interface AppStoreInterface {
  search: string;
  setSearch: (searchQuery: string) => void;
  //
  openTableDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}

export const useAppStore = create<AppStoreInterface>((set) => ({
  search: "",
  openTableDialog: false,
  setOpenDialog: (openProp: boolean) => {
    set({ openTableDialog: openProp });
  },
  setSearch: (searchQuery: string) => {
    set({ search: searchQuery });
  },
}));
