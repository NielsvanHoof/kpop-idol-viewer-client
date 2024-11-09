"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PhotoGalleryProps {
  photos: string[];
}

export default function IdolPhotoGallery({ photos }: PhotoGalleryProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between child animations
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.section
      className="bg-white py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Photo Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              className="relative w-full h-48"
              variants={itemVariants}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={photo}
                alt={`Idol photo ${index + 1}`}
                fill={true}
                sizes="200px"
                style={{ objectFit: "cover" }}
                priority={true}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
