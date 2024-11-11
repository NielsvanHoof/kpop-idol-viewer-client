"use client";

import Error from "@/app/_error";
import fetchTopSongs from "@/queries/spotify/fetchTopSongs";
import { Idol } from "@/types/models";
import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function IdolTopSongs({ idol }: { idol: Idol }) {
  const {
    data: topSongs,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["top-songs", idol.spotify_id],
    queryFn: () => fetchTopSongs(idol.spotify_id),
    enabled: !!idol.spotify_id,
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
    return <Error message="Failed to fetch top songs" onRetry={refetch} />;
  }

  // Placeholder if there are no top songs
  if (!topSongs?.tracks?.length) {
    return (
      <div className="flex flex-col items-center justify-center bg-purple-50 border border-purple-200 rounded-lg p-8 text-center shadow-md">
        <MusicalNoteIcon className="h-16 w-16 text-purple-300 mb-4" />
        <h3 className="text-2xl font-semibold text-purple-700">
          No Top Songs Available
        </h3>
        <p className="text-gray-600 mt-2">
          It seems this idol doesn’t have any top songs available right now.
          Check back later for updates!
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {topSongs?.tracks.map((song) => (
        <motion.div
          key={song.id}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.1 }}
          variants={itemVariants}
          className="flex items-center bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition space-x-4"
        >
          <div className="relative w-16 h-16 overflow-hidden rounded-lg">
            <Image
              src={song.album.images[0].url}
              width={64}
              height={64}
              alt={song.name}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800">{song.name}</h3>
            <p className="text-sm text-gray-500">
              {song.artists.map((artist) => artist.name).join(", ")}
            </p>
            <p className="text-xs text-gray-400">
              Album: {song.album.name} · Released: {song.album.release_date}
            </p>
          </div>
          {song.preview_url ? (
            <audio controls>
              <source src={song.preview_url} type="audio/mpeg" />
            </audio>
          ) : (
            <p className="text-sm text-gray-400">Preview not available</p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
