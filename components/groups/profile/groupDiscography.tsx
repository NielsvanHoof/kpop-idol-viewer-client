"use client";

import Error from "@/app/_error";
import FetchAlbums from "@/queries/spotify/fetchAlbums";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { CiMusicNote1 } from "react-icons/ci";

const containerVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function GroupDiscography({
  slug,
  spotifyId,
}: {
  slug: string;
  spotifyId: string;
}) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["group-discography", slug],
    queryFn: () => FetchAlbums(spotifyId),
    enabled: !!spotifyId,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="flex items-center bg-white rounded-lg p-4 animate-pulse shadow-md space-x-4"
          >
            <div className="w-16 h-16 rounded-md bg-gray-300"></div>
            <div className="flex-1 space-y-2">
              <div className="w-3/4 h-4 bg-gray-300"></div>
              <div className="w-1/2 h-4 bg-gray-300"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return <Error message="Failed to fetch discography" onRetry={refetch} />;
  }

  if (!data?.items.length) {
    return (
      <div className="flex flex-col items-center justify-center bg-purple-50 border border-purple-200 rounded-lg p-8 text-center shadow-md">
        <CiMusicNote1 className="h-16 w-16 text-purple-300 mb-4" />
        <h3 className="text-2xl font-semibold text-purple-700">
          No Albums Available
        </h3>
        <p className="text-gray-600 mt-2">
          It seems this idol doesn’t have any albums available right now. Check
          back later for updates!
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6" // Increased space between items for visual clarity
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {data.items.map((album) => (
        <a
          key={album.id}
          href={album.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <motion.div
            whileHover={{
              scale: 1.01,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            }}
            transition={{ duration: 0.2 }}
            variants={itemVariants}
            className="flex items-center bg-gradient-to-r from-white to-purple-50 rounded-xl p-5 shadow-lg hover:shadow-xl transition space-x-4"
          >
            {/* Album Art */}
            <div className="relative w-20 h-20 overflow-hidden rounded-lg shadow-md flex-shrink-0">
              <Image
                src={album.images[0].url}
                width={80}
                height={80}
                alt={album.name}
                className="object-cover"
              />
            </div>

            {/* Album Details */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-purple-800 mb-1">
                {album.name}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                {new Date(album.release_date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                {album.total_tracks}{" "}
                {album.total_tracks > 1 ? "tracks" : "track"}
              </p>
              <p className="text-xs text-gray-400">
                {album.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          </motion.div>
        </a>
      ))}
    </motion.div>
  );
}
