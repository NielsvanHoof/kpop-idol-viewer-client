"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface IdolProfileProps {
  name: string;
  profilePicture: string;
}

export default function IdolProfileSection({
  name,
  profilePicture,
}: IdolProfileProps) {
  return (
    <motion.section
      className="relative bg-gradient-to-r from-purple-500 to-pink-500 py-16 text-white"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.div
          className="relative w-48 h-48 mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Image
              src={profilePicture}
              alt={name}
              fill={true}
              sizes="200px"
              style={{ objectFit: "cover" }}
              priority={true}
              className="rounded-full"
            />
          </div>
        </motion.div>
        <motion.h1
          className="text-4xl font-bold mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {name}
        </motion.h1>
      </div>
    </motion.section>
  );
}
