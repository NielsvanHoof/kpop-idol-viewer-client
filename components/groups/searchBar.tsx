"use client";
import { useGroupOverviewStore } from "@/state/group.overview";
import { Input } from "@headlessui/react";

export default function GroupSearchBar() {
  const useGroupOverViewStore = useGroupOverviewStore();
  return (
    <div className="mb-6">
      <Input
        type="text"
        placeholder="Search groups..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
        value={useGroupOverViewStore.searchQuery}
        onChange={(e) => useGroupOverViewStore.setSearchQuery(e.target.value)}
      />
    </div>
  );
}
