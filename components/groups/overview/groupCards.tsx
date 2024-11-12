"use client";

import Error from "@/app/_error";
import fetchGroups from "@/queries/groups/fetchGroups";
import { useGroupOverviewStore } from "@/state/group.overview";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { remark } from "remark";

export default function GroupCards() {
  const useGroupOverViewStore = useGroupOverviewStore();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      "groups",
      useGroupOverViewStore.searchQuery,
      useGroupOverViewStore.filterYear,
      useGroupOverViewStore.sortOption,
    ],
    queryFn: () => fetchGroups(useGroupOverViewStore.searchQuery),
  });

  if (isLoading) {
    return (
      <div className="p-4 bg-gray-200 rounded-lg animate-pulse h-40 w-full" />
    );
  }

  if (isError) {
    return (
      <Error statusCode={500} message="An error occurred" onRetry={refetch} />
    );
  }

  return (
    <div className="space-y-6">
      {data?.data
        .filter((group) => {
          return (
            (useGroupOverViewStore.filterYear === "All Years" ||
              new Date(group.debut_date).getFullYear().toString() ===
                useGroupOverViewStore.filterYear) &&
            group.name
              .toLowerCase()
              .includes(useGroupOverViewStore.searchQuery.toLowerCase())
          );
        })
        .map((group, index) => (
          <Link key={index} href={`/groups/${group.slug}`}>
            <motion.div
              key={index}
              className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6"
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              transition={{ duration: 0.3 }}
              onClick={() => useGroupOverViewStore.setSelectedGroup(group)}
            >
              {/* Group image */}
              <div className="relative w-full md:w-1/4 h-40 rounded-lg overflow-hidden shadow-sm">
                <Image
                  src={group.cover_picture}
                  alt={group.name}
                  fill={true}
                  sizes="200px"
                  style={{ objectFit: "cover" }}
                  priority={true}
                  className="rounded-lg"
                />
              </div>
              <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold text-purple-700 mb-2">
                  {group.name}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  Debut Year: {new Date(group.debut_date).getFullYear()}
                </p>
                <div
                  className="text-gray-600 line-clamp-2"
                  dangerouslySetInnerHTML={{
                    __html: remark().processSync(group.bio).toString(),
                  }}
                />
              </div>
            </motion.div>
          </Link>
        ))}
    </div>
  );
}
