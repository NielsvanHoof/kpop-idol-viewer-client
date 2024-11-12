"use client";

import { Idol } from "@/types/models";
import { motion } from "framer-motion";
import {
  FaCircleInfo,
  FaInstagram,
  FaTrophy,
  FaUsers,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

interface BioProps {
  achievements: string[];
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  trivia: string[];
  description: string;
  idol: Idol;
}

export default function IdolDetailsSection({
  achievements,
  socialLinks,
  trivia,
  description,
  idol,
}: BioProps) {
  return (
    <motion.div
      className="space-y-8 text-gray-800 bg-gradient-to-r from-purple-50 to-white p-8 rounded-xl shadow-xl max-w-4xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { delayChildren: 0.2, staggerChildren: 0.1 },
        },
      }}
    >
      {/* Hero Section with Background Image */}
      <div
        className="relative bg-cover bg-center h-48 rounded-xl overflow-hidden"
        style={{ backgroundImage: `url('/path/to/image.jpg')` }} // Replace with actual image path
      >
        <div className="absolute inset-0 bg-purple-800 opacity-50 rounded-xl"></div>
        <div className="relative text-white p-6">
          <h1 className="text-4xl font-bold">{idol.name}</h1>
          <p className="text-lg">Member of {idol.group?.name}</p>
        </div>
      </div>

      {/* About Section */}
      <motion.div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4">
        <h3 className="text-3xl font-bold text-purple-700 flex items-center space-x-2">
          <FaCircleInfo className="text-purple-500" />
          <span>About</span>
        </h3>
        <div
          className="text-lg leading-relaxed text-gray-700"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <ul className="mt-4 space-y-2 text-gray-600">
          <li>
            <strong className="font-semibold">Birthdate:</strong>{" "}
            {new Date(idol.birthdate).toDateString()}
          </li>
          <li>
            <strong className="font-semibold">Birthplace:</strong>{" "}
            {idol.nationality}
          </li>
          <li>
            <strong className="font-semibold">Debut Date:</strong>{" "}
            {new Date(idol.debute_date).toDateString()}
          </li>
        </ul>
      </motion.div>

      {/* Group Affiliations */}
      {idol.group && (
        <motion.div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4">
          <h3 className="text-2xl font-bold text-purple-700 flex items-center space-x-2">
            <FaUsers className="text-purple-500" />
            <span>Group Affiliations</span>
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <strong className="font-semibold">Name:</strong> {idol.group.name}
            </li>
            <li>
              <strong className="font-semibold">Company:</strong>{" "}
              {idol.group.company}
            </li>
            <li>
              <strong className="font-semibold">Debut Year:</strong>{" "}
              {new Date(idol.group.debut_date).getFullYear()}
            </li>
          </ul>
        </motion.div>
      )}

      {/* Achievements with Progress Bar Example */}
      {achievements && achievements.length > 0 && (
        <motion.div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4">
          <h3 className="text-2xl font-bold text-purple-700 flex items-center space-x-2">
            <FaTrophy className="text-purple-500" />
            <span>Achievements</span>
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
            {achievements.map((achievement, index) => (
              <li key={index} className="leading-relaxed">
                {achievement}
              </li>
            ))}
          </ul>
          {/* Example Progress Bar */}
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                Top 100
              </span>
              <span className="text-xs font-semibold inline-block text-purple-600">
                70%
              </span>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
              <div
                style={{ width: "70%" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
              ></div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Trivia Section with Interactive Cards */}
      {trivia && trivia.length > 0 && (
        <motion.div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4">
          <h3 className="text-2xl font-bold text-purple-700 flex items-center space-x-2">
            <FaCircleInfo className="text-purple-500" />
            <span>Trivia</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trivia.map((fact, index) => (
              <motion.div
                key={index}
                className="p-4 bg-purple-50 rounded-lg shadow hover:shadow-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-gray-700">{fact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Social Media Links with Hover Effects */}
      {socialLinks && (
        <motion.div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4">
          <h3 className="text-2xl font-bold text-purple-700 flex items-center space-x-2">
            <FaUsers className="text-purple-500" />
            <span>Follow on Social Media</span>
          </h3>
          <div className="flex space-x-6 text-purple-600">
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-800 transition duration-300 transform hover:scale-110 hover:shadow-md"
              >
                <FaInstagram className="h-7 w-7" />
              </a>
            )}
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-800 transition duration-300 transform hover:scale-110 hover:shadow-md"
              >
                <FaXTwitter className="h-7 w-7" />
              </a>
            )}
            {socialLinks.youtube && (
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-800 transition duration-300 transform hover:scale-110 hover:shadow-md"
              >
                <FaYoutube className="h-7 w-7" />
              </a>
            )}
          </div>
          <button className="mt-4 bg-purple-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-purple-700 transition duration-300">
            Follow for Updates
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
