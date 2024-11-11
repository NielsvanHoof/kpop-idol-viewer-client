"use client";

import { Idol } from "@/types/models";
import { UserGroupIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";

interface GroupMembersProps {
  members: Idol[];
}

export default function GroupMembers({ members }: GroupMembersProps) {
  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-purple-50 border border-purple-200 rounded-lg p-8 text-center shadow-md">
        <UserGroupIcon className="h-16 w-16 text-purple-300 mb-4" />
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
          <div
            key={member.id}
            className="text-center bg-white shadow rounded-lg p-4"
          >
            <Image
              src={member.profile_picture}
              alt={member.name}
              width={100}
              height={100}
              className="rounded-full object-cover mx-auto shadow"
            />
            <h3 className="mt-2 text-lg font-semibold">{member.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
