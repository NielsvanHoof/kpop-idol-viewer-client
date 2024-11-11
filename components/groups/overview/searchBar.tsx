"use client";

import { useGroupOverviewStore } from "@/state/group.overview";
import { Input } from "@headlessui/react";

export default function GroupSearchBar() {
  const useGroupOverViewStore = useGroupOverviewStore();
  return (
    <div className="mb-6 sticky top-0 z-30">
      <Input
        type="text"
        placeholder="Search groups..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 shadow-sm"
        value={useGroupOverViewStore.searchQuery}
        onChange={(e) => useGroupOverViewStore.setSearchQuery(e.target.value)}
      />

      <div className="flex space-x-2 mt-2">
        {useGroupOverViewStore.filterYear !== "All Years" && (
          <div className="flex items-center bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
            {useGroupOverViewStore.filterYear}
            <button
              onClick={() => useGroupOverViewStore.setFilterYear("All Years")}
              className="ml-2 text-red-500"
            >
              &times;
            </button>
          </div>
        )}
        {/* Repeat for other filters */}
      </div>
    </div>
  );
}
