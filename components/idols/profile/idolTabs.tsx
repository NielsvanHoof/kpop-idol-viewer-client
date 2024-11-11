// IdolTabsContent.tsx
"use client";

import IdolPhotoGallery from "@/components/idols/profile/idolPhotoGallery";
import IdolUpcomingEvents from "@/components/idols/profile/idolUpcomingEvents";
import { Idol, Schedule } from "@/types/models";
import {
  Button,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { Fragment } from "react";
import IdolDetailsSection from "./idolDetailsSection";
import IdolTopSongs from "./idolTopSongs";

export default function IdolTabsContent({
  idol,
  events,
  description,
}: {
  idol: Idol;
  events: Schedule[];
  description: string;
}) {
  const tabSections = [
    {
      name: "Bio",
      component: (
        <IdolDetailsSection
          idol={idol}
          achievements={[
            "Won 'Best Female Group' at MAMA Awards 2021",
            "Featured in Billboard Top 100",
          ]}
          socialLinks={{
            instagram: "https://instagram.com/idolname",
            twitter: "https://twitter.com/idolname",
          }}
          trivia={[
            "Loves painting in her free time.",
            "Her favorite color is blue.",
          ]}
          description={description}
        />
      ),
    },
    {
      name: "Photos",
      component: <IdolPhotoGallery photos={idol.photos} />,
    },
    {
      name: "Top Songs",
      component: <IdolTopSongs idol={idol} />,
    },
    {
      name: "Upcoming Events",
      component: <IdolUpcomingEvents events={events} />,
    },
  ];

  return (
    <div>
      <TabGroup defaultIndex={0} as="div" className="text-center">
        <TabList className="flex justify-center space-x-6 py-4 bg-gray-100 shadow-md rounded-md overflow-hidden">
          {tabSections.map((tab) => (
            <Tab key={tab.name} as={Fragment}>
              {({ selected }) => (
                <Button
                  className={`relative px-4 py-2 text-lg font-semibold transition-all duration-300 rounded-md ${
                    selected
                      ? "text-purple-700 bg-purple-100 shadow-inner"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab.name}
                  {selected && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-purple-700 rounded-full transition-all duration-300"
                      style={{
                        transform: selected ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "center",
                      }}
                    />
                  )}
                </Button>
              )}
            </Tab>
          ))}
        </TabList>
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
