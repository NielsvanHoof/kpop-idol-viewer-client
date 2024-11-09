"use client";

import fetchGroups from "@/queries/groups/fetchGroups";
import { useIdolOverviewStore } from "@/state/idol.overview";
import {
  Input,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function IdolOverViewFilters() {
  const [groupsEnabled, setGroupsEnabled] = useState(false);

  const useOverViewStore = useIdolOverviewStore();

  const groups = useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
    enabled: groupsEnabled,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search idols by name or group..."
        className="col-span-1 md:col-span-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
        value={useOverViewStore.searchQuery}
        onChange={(e) => useOverViewStore.setSearchQuery(e.target.value)}
      />

      {/* Filter Group ListBox */}
      <Listbox
        value={useOverViewStore.filterGroup}
        onChange={(value) => useOverViewStore.setFilterGroup(value)}
      >
        <div className="relative col-span-1 md:col-span-1">
          <ListboxButton
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            onMouseEnter={() => setGroupsEnabled(true)}
          >
            {useOverViewStore.filterGroup === 0
              ? "All Groups"
              : groups.data?.data.find(
                  (group) => group.id === useOverViewStore.filterGroup
                )?.name}
          </ListboxButton>
          <ListboxOptions className="absolute mt-1 w-full bg-white shadow-lg rounded-lg z-10">
            <ListboxOption
              value={0}
              className={({ focus }) =>
                `cursor-pointer select-none p-2 ${focus ? "bg-purple-100" : ""}`
              }
            >
              All Groups
            </ListboxOption>
            {groups.data?.data.map((group) => (
              <ListboxOption
                key={group.id}
                value={group.id}
                className={({ focus }) =>
                  `cursor-pointer select-none p-2 ${
                    focus ? "bg-purple-100" : ""
                  }`
                }
              >
                {group.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>

      {/* Sort Option ListBox */}
      <Listbox
        value={useOverViewStore.sortOption}
        onChange={(value) => useOverViewStore.setSortOption(value)}
      >
        <div className="relative col-span-1 md:col-span-1">
          <ListboxButton className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
            Sort by {useOverViewStore.sortOption}
          </ListboxButton>
          <ListboxOptions className="absolute mt-1 w-full bg-white shadow-lg rounded-lg z-10">
            {["Name", "debute_date"].map((option, index) => (
              <ListboxOption
                key={index}
                value={option as "Name" | "debute_date"}
                className={({ focus }) =>
                  `cursor-pointer select-none p-2 ${
                    focus ? "bg-purple-100" : ""
                  }`
                }
              >
                Sort by {option === "Name" ? "Name" : "Debut Year"}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}
