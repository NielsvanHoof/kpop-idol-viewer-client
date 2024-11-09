"use client";

import { useEventStore } from "@/state/idol.events";
import { Schedule } from "@/types/models";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import IdolEventFilter from "./idolEventFilter";
import IdolEventModalDetails from "./idolEventModalDetails";

interface IdolEventsProps {
  events: Schedule[];
}

export default function IdolUpcomingEvents({ events }: IdolEventsProps) {
  const eventStore = useEventStore();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Filter and sort events based on user input
  const filteredEvents = events
    .filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(eventStore.searchQuery.toLowerCase());
      const matchesType =
        eventStore.filterType === "All" || event.type === eventStore.filterType;
      const eventDate = new Date(event.date).getTime();
      const withinDateRange =
        (!eventStore.startDate ||
          eventDate >= new Date(eventStore.startDate).getTime()) &&
        (!eventStore.endDate ||
          eventDate <= new Date(eventStore.endDate).getTime());
      return matchesSearch && matchesType && withinDateRange;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return eventStore.sortOption === eventStore.sortOptions[0]
        ? dateA - dateB
        : dateB - dateA;
    });

  const openModal = (event: Schedule) => {
    eventStore.setSelectedEvent(event);
    eventStore.setIsModalOpen(true);
  };

  return (
    <>
      <motion.section
        ref={ref}
        className="bg-gray-100 py-8"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <IdolEventFilter />

          <h2 className="text-2xl font-bold mb-4 mt-6">Upcoming Events</h2>

          {/* Event list */}
          {filteredEvents.length > 0 ? (
            <motion.ul
              className="space-y-2"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              {filteredEvents.map((event, index) => (
                <motion.li
                  key={index}
                  className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ scale: 1.02 }}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-gray-600">
                    Date: {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">Type: {event.type}</p>
                  <button
                    onClick={() => openModal(event)}
                    className="mt-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    More Information
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <p className="text-gray-600">No events found.</p>
          )}

          {/* Modal for Event Details */}
          <IdolEventModalDetails />
        </div>
      </motion.section>
    </>
  );
}
