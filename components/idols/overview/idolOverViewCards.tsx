"use client";

import Error from "@/app/_error";
import fetchIdols from "@/queries/idols/fetchIdols";
import { useIdolOverviewStore } from "@/state/idol.overview";
import { Button } from "@headlessui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SkeletonCard from "../../ui/skeletonCard";

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
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "idols",
      useOverViewStore.searchQuery,
      useOverViewStore.filterGroup,
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

  const observer = useRef<IntersectionObserver | null>(null);
  const lastIdolElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (isLoading && !data) {
    // Initial loading state with skeleton loaders
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
                      ref={isLastElement ? lastIdolElementRef : null}
                      className="relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Badge indicators */}
                      {new Date(idol.debute_date).getFullYear() >= 2020 && (
                        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          New
                        </span>
                      )}

                      {/* Image section */}
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
                          Debut Year: {new Date(idol.debute_date).getFullYear()}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </React.Fragment>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Loading indicator for fetching next page */}
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

      {/* No more data message */}
      {!hasNextPage && (
        <p className="mt-6 text-gray-500 text-sm">No more idols to load.</p>
      )}
    </div>
  );
}
