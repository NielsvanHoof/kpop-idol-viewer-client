"use client";

import { Idol } from "@/types/models";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function IdolDetailsSection({ idol }: { idol: Idol }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      className="bg-white py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
        <p>
          <strong>Debut Year:</strong>{" "}
          {new Date(idol.debute_date).getFullYear()}
        </p>
        <p>
          <strong>Agency:</strong> {idol.group.company}
        </p>
        <div className="mt-4 flex space-x-4">
          {/* {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <img
                src={`/icons/${link.platform}.svg`}
                alt={link.platform}
                className="w-6 h-6 inline"
              />
            </motion.a>
          ))} */}
        </div>
      </div>
    </motion.section>
  );
}
