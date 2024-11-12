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
      className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
        <div className="relative w-full md:w-1/3 h-64">
          <Image
            src={group.cover_picture}
            alt={group.name}
            fill={true}
            sizes="100%"
            className="rounded-lg object-cover shadow-lg"
            priority={true}
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{group.name}</h1>
          <p className="text-lg">
            Debut Year: {new Date(group.debut_date).getFullYear()}
          </p>
          <p className="text-lg">Company: {group.company}</p>
          <p
            className="mt-4 text-gray-100"
            dangerouslySetInnerHTML={{
              __html: remark().processSync(group.bio).toString(),
            }}
          />
        </div>
      </div>
    </motion.section>
  );
}
