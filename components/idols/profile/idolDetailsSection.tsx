"use client";

import { Idol } from "@/types/models";
import { motion } from "framer-motion";
import { FaCircleInfo, FaTrophy, FaUsers } from "react-icons/fa6";

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
    </motion.div>
  );
}
