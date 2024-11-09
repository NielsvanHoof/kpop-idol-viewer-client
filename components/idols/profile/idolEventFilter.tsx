import { useEventStore } from "@/state/idol.events";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Input,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

export default function IdolEventFilter() {
  const eventStore = useEventStore();

  return (
    <Disclosure>
      {({ open }) => (
        <div>
          <DisclosureButton className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300">
            {open ? "Hide Filters" : "Show Filters"}
          </DisclosureButton>
          <DisclosurePanel className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Search events..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                value={eventStore.searchQuery}
                onChange={(e) => eventStore.setSearchQuery(e.target.value)}
              />

              {/* Event Type Filter ListBox */}
              <Listbox
                value={eventStore.filterType}
                onChange={(value) => eventStore.setFilterType(value)}
              >
                <div className="relative">
                  <ListboxButton className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                    {eventStore.filterType}
                  </ListboxButton>
                  <ListboxOptions className="absolute mt-1 w-full bg-white shadow-md rounded-lg z-10">
                    {eventStore.options.map((option, index) => (
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

              {/* Date Range Inputs */}
              <div className="flex space-x-2">
                <Input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  value={eventStore.startDate}
                  onChange={(e) => eventStore.setStartDate(e.target.value)}
                />
                <Input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  value={eventStore.endDate}
                  onChange={(e) => eventStore.setEndDate(e.target.value)}
                />
              </div>

              {/* Sort Options ListBox */}
              <Listbox
                value={eventStore.sortOption}
                onChange={(value) => eventStore.setSortOption(value)}
              >
                <div className="relative">
                  <ListboxButton className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                    {eventStore.sortOption}
                  </ListboxButton>
                  <ListboxOptions className="absolute mt-1 w-full bg-white shadow-md rounded-lg z-10">
                    {eventStore.sortOptions.map((option, index) => (
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
