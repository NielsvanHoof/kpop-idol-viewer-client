"use client";

import fetchGroups from "@/queries/groups/fetchGroups";
import { useIdolOverviewStore } from "@/state/idol.overview";
import {
  Button,
  Input,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { HiAdjustmentsVertical } from "react-icons/hi2";
import { IoChevronDown } from "react-icons/io5";

export default function IdolOverViewFilters() {
  const [groupsEnabled, setGroupsEnabled] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(true);

  const useOverViewStore = useIdolOverviewStore();

  const groups = useQuery({
    queryKey: ["groups"],
    queryFn: () => fetchGroups(),
    enabled: groupsEnabled,
  });

  return (
    <div className="mb-6">
      {/* Toggle Button for Filters */}
      <Button
        onClick={() => setFiltersVisible(!filtersVisible)}
        className="flex items-center mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 focus:outline-none"
      >
        <HiAdjustmentsVertical className="w-5 h-5 mr-2" />
        {filtersVisible ? "Hide Filters" : "Show Filters"}
      </Button>

      {/* Filters Section */}
      {filtersVisible && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 flex items-center justify-between"
                onMouseEnter={() => setGroupsEnabled(true)}
              >
                {useOverViewStore.filterGroup === 0
                  ? "All Groups"
                  : groups.data?.data.find(
                      (group) => group.id === useOverViewStore.filterGroup
                    )?.name}
                <IoChevronDown className="w-5 h-5 text-gray-500 ml-2" />
              </ListboxButton>
              <ListboxOptions className="absolute mt-1 w-full bg-white shadow-lg rounded-lg z-10">
                <ListboxOption
                  value={0}
                  className={({ focus }) =>
                    `cursor-pointer select-none p-2 ${
                      focus ? "bg-purple-100" : ""
                    }`
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
              <ListboxButton className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 flex items-center justify-between">
                Sort by{" "}
                {useOverViewStore.sortOption === "debute_date"
                  ? "Debute Date"
                  : "name"}
                <IoChevronDown className="w-5 h-5 text-gray-500 ml-2" />
              </ListboxButton>
              <ListboxOptions className="absolute mt-1 w-full bg-white shadow-lg rounded-lg z-10">
                {["name", "debute_date"].map((option, index) => (
                  <ListboxOption
                    key={index}
                    value={option as "name" | "Debute date"}
                    className={({ focus }) =>
                      `cursor-pointer select-none p-2 ${
                        focus ? "bg-purple-100" : ""
                      }`
                    }
                  >
                    {option === "debute_date" ? "Debute Date" : option}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </motion.div>
      )}
    </div>
  );
}
