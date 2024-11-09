import { Schedule } from "@/types/models";
import { create } from "zustand";

interface IdolEventsProps {
  searchQuery: string;
  filterType: string;
  startDate: string;
  sortOption: string;
  endDate: string;
  selectedEvent: Schedule | null;
  isModalOpen: boolean;
  sortOptions: ["Date: Oldest to Newest", "Date: Newest to Oldest"];
  options: ["All", "group", "solo"];

  setSearchQuery: (searchQuery: string) => void;
  setFilterType: (filterType: string) => void;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
  setSortOption: (sortOption: string) => void;
  setSelectedEvent: (event: Schedule) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const useEventStore = create<IdolEventsProps>((set) => ({
  searchQuery: "",
  filterType: "All",
  startDate: "",
  selectedEvent: null,
  isModalOpen: false,
  sortOption: "Date: Oldest to Newest",
  endDate: "",
  sortOptions: ["Date: Oldest to Newest", "Date: Newest to Oldest"],
  options: ["All", "group", "solo"],

  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  setFilterType: (filterType: string) => set({ filterType }),
  setStartDate: (startDate: string) => set({ startDate }),
  setEndDate: (endDate: string) => set({ endDate }),
  setSortOption: (sortOption: string) => set({ sortOption }),
  setSelectedEvent: (selectedEvent: Schedule) => set({ selectedEvent }),
  setIsModalOpen: (isModalOpen: boolean) => set({ isModalOpen }),
}));
