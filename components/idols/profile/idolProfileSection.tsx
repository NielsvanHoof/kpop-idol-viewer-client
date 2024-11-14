"use client";

import { Idol } from "@/types/models";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";

export default function IdolProfileSection({
  idol,
  socialLinks,
}: {
  idol: Idol;
  socialLinks?: { instagram: string; twitter: string; youtube: string };
}) {
  return (
    <motion.section
      className="relative bg-gradient-to-r from-purple-500 to-pink-500 pb-4 pt-16 text-white"
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
              src={idol.profile_picture}
              alt={idol.name}
              fill={true}
              sizes="200px"
              style={{ objectFit: "cover" }}
              priority={true}
              className="rounded-full"
            />
          </div>
        </motion.div>
        <motion.div
          className="text-4xl font-bold mb-2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-white">{idol.name}</h1>
          <p className="text-lg">Member of {idol.group?.name}</p>
        </motion.div>

        {socialLinks && (
          <div className="flex space-x-4 my-2">
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-800 transition duration-300 transform hover:scale-110 hover:shadow-md"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
            )}
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-800 transition duration-300 transform hover:scale-110 hover:shadow-md"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
            )}
            {socialLinks.youtube && (
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-800 transition duration-300 transform hover:scale-110 hover:shadow-md"
              >
                <FaYoutube className="h-5 w-5" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
}
