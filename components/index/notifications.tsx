"use client";

import { motion } from "framer-motion";

export default function NotificationsDemo() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Stay Notified</h2>
        <motion.div
          className="inline-block bg-purple-500 text-white px-6 py-3 rounded-full shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Receive alerts for new releases and updates.
        </motion.div>
      </div>
    </section>
  );
}
