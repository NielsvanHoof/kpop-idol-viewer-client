"use client";

import Error from "@/app/_error";
import FetchAlbums from "@/queries/spotify/fetchAlbums";
import { MusicalNoteIcon } from "@heroicons/react/16/solid";
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
        <MusicalNoteIcon className="h-16 w-16 text-purple-300 mb-4" />
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
      className="space-y-4"
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
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.1 }}
            variants={itemVariants}
            className="flex items-center bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition space-x-4"
          >
            <div className="relative w-16 h-16 overflow-hidden rounded-lg">
              <Image
                src={album.images[0].url}
                width={64}
                height={64}
                alt={album.name}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-800">
                {album.name}
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(album.release_date).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-400">
                {album.total_tracks} tracks
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
