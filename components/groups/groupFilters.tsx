"use client";

import { useGroupOverviewStore } from "@/state/group.overview";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

export default function GroupFilters() {
  const useGroupOverViewStore = useGroupOverviewStore();
  return (
    <Disclosure>
      {({ open }) => (
        <div>
          <DisclosureButton className="w-full text-left px-4 py-2 bg-purple-700 text-white rounded-lg mb-4 focus:outline-none focus:ring focus:ring-purple-300">
            {open ? "Hide Filters" : "Show Filters"}
          </DisclosureButton>
          <DisclosurePanel className="p-4 bg-white rounded-lg shadow-md mb-6">
            <div className="flex flex-col md:flex-row md:space-x-4">
              {/* Filter by Year */}
              <Listbox
                value={useGroupOverViewStore.filterYear}
                onChange={(value) => useGroupOverViewStore.setFilterYear(value)}
              >
                <div className="relative w-full md:w-1/3">
                  <ListboxButton className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                    Filter by Year: {useGroupOverViewStore.filterYear}
                  </ListboxButton>
                  <ListboxOptions className="absolute mt-1 w-full bg-white shadow-lg rounded-lg z-10">
                    {useGroupOverViewStore.yearOptions.map((year, index) => (
                      <ListboxOption
                        key={index}
                        value={year}
                        className={({ focus }) =>
                          `cursor-pointer select-none p-2 ${
                            focus ? "bg-purple-100" : ""
                          }`
                        }
                      >
                        {year}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>

              {/* Sort by Options */}
              <Listbox
                value={useGroupOverViewStore.sortOption}
                onChange={(value) => useGroupOverViewStore.setSortOption(value)}
              >
                <div className="relative w-full md:w-1/3">
                  <ListboxButton className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                    Sort by {useGroupOverViewStore.sortOption}
                  </ListboxButton>
                  <ListboxOptions className="absolute mt-1 w-full bg-white shadow-lg rounded-lg z-10">
                    {useGroupOverViewStore.sortOptions.map((option, index) => (
                      <ListboxOption
                        key={index}
                        value={option}
                        className={({ focus }) =>
                          `cursor-pointer select-none p-2 ${
                            focus ? "bg-purple-100" : ""
                          }`
                        }
                      >
                        {option}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}
