import { Group } from "@/types/models";
import { create } from "zustand";

interface GroupOverviewProps {
  searchQuery: string;
  sortOption: string;
  filterYear: string;
  selectedGroup: Group | null;
  sortOptions: ["Alphabetical", "Debut Year"];
  yearOptions: ["All Years", "2023", "2022", "2021", "2020"];

  setSearchQuery: (searchQuery: string) => void;
  setSortOption: (sortOption: string) => void;
  setFilterYear: (filterYear: string) => void;
  setSelectedGroup: (group: Group | null) => void;
}

export const useGroupOverviewStore = create<GroupOverviewProps>((set) => ({
  searchQuery: "",
  sortOption: "Alphabetical",
  filterYear: "All Years",
  selectedGroup: null,
  sortOptions: ["Alphabetical", "Debut Year"],
  yearOptions: ["All Years", "2023", "2022", "2021", "2020"],

  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  setSortOption: (sortOption: string) => set({ sortOption }),
  setFilterYear: (filterYear: string) => set({ filterYear }),
  setSelectedGroup: (selectedGroup: Group | null) => set({ selectedGroup }),
}));
