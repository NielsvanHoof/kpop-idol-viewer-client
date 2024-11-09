"use client";

import { motion } from "framer-motion";

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Features at a Glance
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="p-6 bg-white rounded-lg shadow-md text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-2">Idol Profiles</h3>
            <p>
              Detailed information on your favorite idols, including debut year,
              social media links, and upcoming schedules.
            </p>
          </motion.div>
          <motion.div
            className="p-6 bg-white rounded-lg shadow-md text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-2">Event Calendar</h3>
            <p>
              Track all events and releases through an easy-to-use calendar view
              synced with Google Calendar.
            </p>
          </motion.div>
          <motion.div
            className="p-6 bg-white rounded-lg shadow-md text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-2">Notifications</h3>
            <p>
              Receive real-time updates for new releases and events directly in
              your browser or on your device.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
