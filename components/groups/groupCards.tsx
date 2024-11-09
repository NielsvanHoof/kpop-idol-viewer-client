"use client";

import Error from "@/app/_error";
import fetchGroups from "@/queries/groups/fetchGroups";
import { useGroupOverviewStore } from "@/state/group.overview";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { remark } from "remark";
import Spinner from "../ui/spinner";

export default function GroupCards() {
  const useGroupOverViewStore = useGroupOverviewStore();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <Error statusCode={500} message="An error occurred" onRetry={refetch} />
    );
  }

  return (
    <div className="space-y-4">
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
          <motion.div
            key={index}
            className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer p-4"
            whileHover={{ scale: 1.02 }}
            onClick={() => useGroupOverViewStore.setSelectedGroup(group)}
          >
            {/* Group image */}
            <div className="relative w-full md:w-1/4 h-40">
              <Image
                src={group.cover_picture}
                alt={group.name}
                fill={true}
                sizes="200px"
                style={{ objectFit: "cover" }}
                priority={true}
              />
            </div>
            <div className="flex-1 p-4">
              <h2 className="text-xl font-semibold text-purple-700">
                {group.name}
              </h2>
              <p className="text-sm text-gray-500">
                Debut Year: {new Date(group.debut_date).getFullYear()}
              </p>
              <div
                className="text-gray-600 mt-2 line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: remark().processSync(group.bio).toString(),
                }}
              />
            </div>
          </motion.div>
        ))}
    </div>
  );
}
