// IdolTabsContent.tsx
"use client";

import { Group } from "@/types/models";
import {
    Button,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from "@headlessui/react";
import { Fragment } from "react";
import GroupDiscography from "./groupDiscography";
import GroupEvents from "./groupEvents";
import GroupMembers from "./groupMembers";
import GroupPhotoGallery from "./groupPhotoGallery";

export default function GroupTabsContent({ group }: { group: Group }) {
  const tabSections = [
    {
      name: "Members",
      component: <GroupMembers members={group.idols} />,
    },
    {
      name: "Photos",
      component: <GroupPhotoGallery photos={group.photos} />,
    },
    {
      name: "Top Albums",
      component: (
        <GroupDiscography slug={group.slug} spotifyId={group.spotify_id} />
      ),
    },
    {
      name: "Upcoming Events",
      component: <GroupEvents events={group.schedules} />,
    },
  ];

  return (
    <div>
      <TabGroup defaultIndex={0} as="div" className="text-center">
        <div className="flex justify-center">
          <TabList className="flex space-x-1 rounded-xl bg-purple-600 p-2 shadow-md overflow-x-auto scrollbar-hide max-w-full">
            {tabSections.map((tab) => (
              <Tab key={tab.name} as={Fragment}>
                {({ selected }) => (
                  <Button
                    className={`whitespace-nowrap py-2 px-4 rounded-lg text-sm font-medium leading-5 text-purple-700 ${
                      selected
                        ? "bg-white shadow"
                        : "text-white hover:bg-purple-500 hover:bg-opacity-75"
                    }`}
                  >
                    {tab.name}
                  </Button>
                )}
              </Tab>
            ))}
          </TabList>
        </div>
        <TabPanels className="mt-6 mb-6">
          {tabSections.map((tab, idx) => (
            <TabPanel key={idx} className="px-4">
              {tab.component}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
}
