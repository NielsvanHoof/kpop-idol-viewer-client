"use client";

import fetchTopSongs from "@/queries/spotify/fetchTopSongs";
import { Idol } from "@/types/models";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";

export default function IdolTopSongs({ idol }: { idol: Idol }) {
  const {
    data: topSongs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["top-songs", idol.spotify_id],
    queryFn: () => fetchTopSongs(idol.spotify_id),
  });

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to fetch top songs</p>;
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
          <div className="relative w-16 h-16 rounded-md overflow-hidden">
            <Image
              src={song.album.images[0].url}
              width={64}
              height={64}
              alt={song.name}
              className="rounded-lg"
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
