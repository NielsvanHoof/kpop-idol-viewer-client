"use client";

import { Group } from "@/types/models";
import { motion } from "framer-motion";
import Image from "next/image";
import { remark } from "remark";

interface GroupHeroSectionProps {
  group: Group;
}

export default function GroupHeroSection({ group }: GroupHeroSectionProps) {
  return (
    <motion.section
      className="relative bg-gradient-to-br from-purple-700 via-pink-600 to-purple-500 text-white py-16 shadow-2xl"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        {/* Cover Image */}
        <motion.div
          className="relative w-full md:w-1/3 h-72 rounded-lg overflow-hidden shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src={group.cover_picture}
            alt={group.name}
            fill={true}
            sizes="100%"
            className="object-cover"
            priority={true}
          />
        </motion.div>

        {/* Text Section */}
        <div className="flex-1">
          <motion.h1
            className="text-5xl font-extrabold mb-4 tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          >
            {group.name}
          </motion.h1>

          <motion.div
            className="text-xl font-semibold text-gray-200 mb-4 space-y-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          >
            <p>
              Debut Year:{" "}
              <span className="text-pink-300">
                {new Date(group.debut_date).getFullYear()}
              </span>
            </p>
            <p>
              Company: <span className="text-pink-300">{group.company}</span>
            </p>
          </motion.div>

          <motion.p
            className="mt-4 text-gray-100 leading-relaxed text-base md:text-lg"
            dangerouslySetInnerHTML={{
              __html: remark().processSync(group.bio).toString(),
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.section>
  );
}
