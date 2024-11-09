"use client";

import { motion } from "framer-motion";

export default function EventsSection() {
  const events = [
    { name: "Idol A Concert", date: "2024-11-15" },
    { name: "Idol B Fan Meeting", date: "2024-11-20" },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
              <p className="text-gray-600">Date: {event.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
