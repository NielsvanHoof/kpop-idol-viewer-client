"use client";

import { Idol } from "@/types/models";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CiUser } from "react-icons/ci";

interface GroupMembersProps {
  members: Idol[];
}

export default function GroupMembers({ members }: GroupMembersProps) {
  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-purple-50 border border-purple-200 rounded-lg p-8 text-center shadow-md">
        <CiUser className="h-16 w-16 text-purple-300 mb-4" />
        <h3 className="text-2xl font-semibold text-purple-700">
          No Members Available
        </h3>
        <p className="text-gray-600 mt-2">
          This group doesn&apos;t have any members to display at the moment.
          Check back later for updates!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {members.map((member) => (
        <Link key={member.id} href={`/idols/${member.slug}`}>
          <motion.div
            key={member.id}
            className="text-center bg-white shadow-lg rounded-xl p-6 hover:bg-purple-50 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            <div className="relative w-24 h-24 mx-auto">
              <Image
                src={member.profile_picture}
                alt={member.name}
                fill
                sizes="100%"
                className="rounded-full object-cover border-4 border-purple-300 shadow-md"
              />
            </div>
            <h3 className="mt-3 text-lg font-semibold text-gray-800">
              {member.name}
            </h3>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
