"use client";

import { Idol } from "@/types/models";
import { motion } from "framer-motion";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

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
      className="space-y-6 text-gray-800 bg-white p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Basic Info */}
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold text-purple-700">About</h3>
        <div dangerouslySetInnerHTML={{ __html: description }} />
        <ul className="mt-4 space-y-1 text-gray-600">
          <li>
            <strong>Birthdate:</strong>{" "}
            {new Date(idol.birthdate).toDateString()}
          </li>
          <li>
            <strong>Birthplace:</strong> {idol.nationality}
          </li>
          <li>
            <strong>Debut Date:</strong>{" "}
            {new Date(idol.debute_date).toDateString()}
          </li>
        </ul>
      </div>

      {/* Group Affiliations */}
      {idol.group && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-purple-700">
            Group Affiliations
          </h3>
          <ul className="space-y-1">
            <li>
              <strong>Name:</strong> {idol.group.name}
            </li>
            <li>
              <strong>Company:</strong> {idol.group.company}
            </li>
            <li>
              <strong>Debut Year:</strong>{" "}
              {new Date(idol.group.debut_date).getFullYear()}
            </li>
          </ul>
        </div>
      )}

      {/* Achievements */}
      {achievements && achievements.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-purple-700">
            Achievements
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Trivia/Fun Facts */}
      {trivia && trivia.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-purple-700">Trivia</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {trivia.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Social Media Links */}
      {socialLinks && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-purple-700">
            Follow on Social Media
          </h3>
          <div className="flex space-x-4 text-purple-500">
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
            )}
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="h-6 w-6" />
              </a>
            )}
            {socialLinks.youtube && (
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="h-6 w-6" />
              </a>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
