"use client";

import Error from "@/app/_error";
import SkeletonCard from "@/components/ui/skeletonCard";
import useInfiniteLoading from "@/hooks/useInfiniteLoading";
import fetchIdols from "@/queries/idols/fetchIdols";
import { useIdolOverviewStore } from "@/state/idol.overview";
import { Schedule } from "@/types/models";
import { Button } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function LatestPerformance({ schedules }: { schedules: Schedule[] }) {
  const latestSchedule = schedules.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  })[0];

  if (!latestSchedule) {
    return (
      <div>
        <p className="text-sm text-gray-500">No Performances</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500">
        {latestSchedule.date > new Date().toISOString()
          ? "Upcoming Performance"
          : "Latest Performance"}
      </p>
      <p className="text-sm text-gray-500">
        {new Date(latestSchedule.date).toDateString()}
      </p>
    </div>
  );
}

export default function IdolOverViewCards() {
  const useOverViewStore = useIdolOverviewStore();

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const {
    data,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    lastElementRef,
  } = useInfiniteLoading({
    queryKey: [
      "idols",
      useOverViewStore.searchQuery,
      useOverViewStore.filterGroup.toString(),
      useOverViewStore.sortOption,
    ],
    queryFn: ({ pageParam }) =>
      fetchIdols(
        useOverViewStore.searchQuery,
        useOverViewStore.filterGroup,
        useOverViewStore.sortOption,
        ["group", "schedules", "group.schedules"],
        pageParam
      ),
    initialPageParam: "1",
    getNextPageParam: (lastPage: { nextCursor: string | null }) =>
      lastPage.nextCursor ?? undefined,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <Error message="Failed to fetch idols" onRetry={refetch} />;
  }

  if (data && data.pages.every((page) => page.data.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center bg-purple-50 border border-purple-200 rounded-lg p-8 text-center shadow-md">
        <CiUser className="h-16 w-16 text-purple-300 mb-4" />
        <h3 className="text-2xl font-semibold text-purple-700">
          No Idols Found
        </h3>
        <p className="text-gray-600 mt-2">
          There are no idols to display at the moment. Try adjusting your search
          or check back later for updates!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {data?.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.data.map((idol, index) => {
                const isLastElement =
                  pageIndex === data.pages.length - 1 &&
                  index === page.data.length - 1;
                return (
                  <Link key={idol.id} href={`/idols/${idol.slug}`}>
                    <motion.div
                      ref={isLastElement ? lastElementRef : null}
                      className="relative p-[2px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg max-w-5xl mx-auto"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, rotate: 0.5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                        <div className="relative w-full h-56">
                          <Image
                            src={idol.profile_picture}
                            alt={idol.name}
                            fill={true}
                            sizes="100%"
                            style={{ objectFit: "cover" }}
                            priority={true}
                            className="rounded-t-lg"
                          />
                        </div>
                        <div className="p-4">
                          <h2 className="text-lg font-semibold text-purple-700">
                            {idol.name}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {idol.group.company}
                          </p>
                          <p className="text-sm text-gray-500">
                            Debut Year:{" "}
                            {new Date(idol.debute_date).getFullYear()}
                          </p>

                          <div className="mt-2">
                            <LatestPerformance schedules={idol.schedules} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </React.Fragment>
          ))}
        </AnimatePresence>
      </motion.div>

      {isFetchingNextPage && (
        <div className="mt-6">
          <SkeletonCard />
        </div>
      )}

      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 focus:outline-none"
          aria-label="Scroll to top"
        >
          ↑
        </Button>
      )}

      {!hasNextPage && (
        <p className="mt-6 text-gray-500 text-sm">No more idols to load.</p>
      )}
    </div>
  );
}
