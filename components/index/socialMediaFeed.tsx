"use client";

import { motion } from "framer-motion";

export default function SocialMediaFeed() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Social Media Feed
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Replace with embedded social media post components */}
          <motion.div
            className="bg-white p-4 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm text-gray-500">Latest post preview here</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
