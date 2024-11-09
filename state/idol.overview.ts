import { create } from "zustand";

interface IdolOverviewProps {
  searchQuery: string;
  filterGroup: number;
  sortOption: "name" | "debute_date";

  setSearchQuery: (searchQuery: string) => void;
  setFilterGroup: (filterGroup: number) => void;
  setSortOption: (sortOption: "name" | "debute_date") => void;
}

export const useIdolOverviewStore = create<IdolOverviewProps>((set) => ({
  searchQuery: "",
  filterGroup: 0,
  sortOption: "name",

  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  setFilterGroup: (filterGroup: number) => set({ filterGroup }),
  setSortOption: (sortOption: "name" | "debute_date") => set({ sortOption }),
}));
